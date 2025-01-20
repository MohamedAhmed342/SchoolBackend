const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const Post = require("../models/postModel"); 
const Comment = require("../models/commentModel");

// Update user
exports.updateUser = asyncHandler(async (req, res) => {
  // From Token
  const loggedInUserId = req.user.id; // Id User From Token
  const isAdmin = req.user.isAdmin;  // is that User Admin ?

  // If Admin --> Can Edit & If The Same User 
  if (loggedInUserId === req.params.id || isAdmin) {
  // You can not edit isAdmin Properity Unless You Really Admin
    if ("isAdmin" in req.body && !isAdmin) {
      return res.status(403).json("You are not allowed to update isAdmin field!");
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json({ message: "Account has been updated", user });
  } else {
    res.status(403).json("You can update only your account!");
  }
});



// Delete user
exports.deleteUser = asyncHandler(async (req, res) => {
  try {
    // Check if the user is an admin
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // Find the user to delete
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
    const user = await User.findById(req.params.id).populate({
      path: "posts", 
      options: { sort: { createdAt: -1 } }, 
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const { password, updatedAt, ...other } = user._doc;

    res.status(200).json({
      user: other,
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
