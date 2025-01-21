const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

// Update user (Admin only for students and teachers)
exports.updateUser = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user.id; // Id User From Token
  const userRole = req.user.role; // User Role From Token

  // Admins only can update users
  if (userRole !== "admin") {
    return res.status(403).json("Access denied. Only admins can update users.");
  }

  // Check if updating a student
  if (req.body.role === "student" && req.body.studentInfo) {
    // Validate student-specific fields
    const { dateOfBirth, grade, phoneNumber, fatherNumber, motherNumber, bloodGroup } = req.body.studentInfo;

    if (dateOfBirth && isNaN(Date.parse(dateOfBirth))) {
      return res.status(400).json("Invalid Date of Birth format.");
    }
    if (grade && !["Primary", "Preparatory", "Secondary", "High School", "College"].includes(grade)) {
      return res.status(400).json("Invalid grade value.");
    }
    if (phoneNumber && (!/^\d{10}$/.test(phoneNumber))) {
      return res.status(400).json("Invalid phone number format.");
    }
    if (fatherNumber && (!/^\d{10}$/.test(fatherNumber))) {
      return res.status(400).json("Invalid father's phone number format.");
    }
    if (motherNumber && (!/^\d{10}$/.test(motherNumber))) {
      return res.status(400).json("Invalid mother's phone number format.");
    }
    if (bloodGroup && !["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(bloodGroup)) {
      return res.status(400).json("Invalid blood group value.");
    }
  }

  // Check if updating a teacher
  if (req.body.role === "teacher" && req.body.teacherInfo) {
    const { subjects, classes, phoneNumber } = req.body.teacherInfo;

    if (phoneNumber && (!/^\d{10}$/.test(phoneNumber))) {
      return res.status(400).json("Invalid phone number format.");
    }
    if (subjects && !Array.isArray(subjects)) {
      return res.status(400).json("Subjects must be an array.");
    }
    if (classes && !Array.isArray(classes)) {
      return res.status(400).json("Classes must be an array.");
    }
  }

  // Hash password if being updated
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

  if (!user) {
    return res.status(404).json("User not found.");
  }

  res.status(200).json({ message: "User has been updated successfully", user });
});

// Delete user (Admin only)
exports.deleteUser = asyncHandler(async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Remove all posts created by the user
    await Post.deleteMany({ userId: user._id });

    // Remove all likes added by the user to posts
    await Post.updateMany(
      { likes: { $in: [user._id.toString(), user._id] } },
      { $pull: { likes: { $in: [user._id.toString(), user._id] } } }
    );

    // Remove all comments created by the user
    await Comment.deleteMany({ userId: user._id });

    // Remove all likes added by the user to comments
    await Comment.updateMany(
      { likes: { $in: [user._id.toString(), user._id] } },
      { $pull: { likes: { $in: [user._id.toString(), user._id] } } }
    );

    // Delete the user
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "User, their posts, comments, and likes have been deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user, their posts, comments, and likes.", error: err.message });
  }
});

// Get user
exports.getUser = asyncHandler(async (req, res) => {
  try {
    // العثور على المستخدم بناءً على الـ ID
    const user = await User.findById(req.params.id).populate({
      path: "posts",
      options: { sort: { createdAt: -1 } },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // إزالة كلمة المرور وبعض البيانات الحساسة
    const { password, updatedAt, ...other } = user._doc;

    // التحقق من الدور وصلاحيات الوصول
    if (req.user.role === "admin") {
      // إذا كان المستخدم أدمن، يمكنه رؤية كل البيانات
      return res.status(200).json({
        user: other,
      });
    }

    if (req.user.id === req.params.id) {
      // إذا كان المستخدم يطلب بياناته الخاصة، يمكنه رؤية كل البيانات
      return res.status(200).json({
        user: other,
      });
    }

    // إذا كان المستخدم شخصًا آخر، يتم تحديد البيانات المسموح بها فقط
    const limitedData = {
      username: user.username,
      email: user.email,
      role: user.role,
      level: user.level || null,
      phoneNumber: user.studentInfo?.phoneNumber || user.teacherInfo?.phoneNumber || null,
    };

    return res.status(200).json({
      user: limitedData,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user data", error: err.message });
  }
});



// // Follow user
// exports.followUser = asyncHandler(async (req, res) => {
//   if (req.body.userId !== req.params.id) {
//     const user = await User.findById(req.params.id);
//     const currentUser = await User.findById(req.body.userId);

//     if (!user.followers.includes(req.body.userId)) {
//       await user.updateOne({ $push: { followers: req.body.userId } });
//       await currentUser.updateOne({ $push: { followings: req.params.id } });
//       res.status(200).json("User has been followed");
//     } else {
//       res.status(403).json("You already follow this user");
//     }
//   } else {
//     res.status(403).json("You can't follow yourself");
//   }
// });

// // Unfollow user
// exports.unfollowUser = asyncHandler(async (req, res) => {
//   if (req.body.userId !== req.params.id) {
//     const user = await User.findById(req.params.id);
//     const currentUser = await User.findById(req.body.userId);

//     if (user.followers.includes(req.body.userId)) {
//       await user.updateOne({ $pull: { followers: req.body.userId } });
//       await currentUser.updateOne({ $pull: { followings: req.params.id } });
//       res.status(200).json("User has been unfollowed");
//     } else {
//       res.status(403).json("You don't follow this user");
//     }
//   } else {
//     res.status(403).json("You can't follow yourself");
//   }
// });
