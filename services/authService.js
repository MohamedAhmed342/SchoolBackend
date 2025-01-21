const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

// إرسال OTP
exports.sendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const otp = crypto.randomInt(100000, 999999).toString(); // إنشاء OTP عشوائي
  user.otp = otp;
  user.otpExpiresAt = Date.now() + 10 * 60 * 1000; // صلاحية 10 دقائق
  await user.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "myasd200210@gmail.com",
      pass: "arvgivqqmvbziios",
    },
  });

  await transporter.sendMail({
    from: '"School Admin" <myasd200210@gmail.com>',
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
  });

  res.status(200).json({ message: "OTP sent successfully" });
});

// التحقق من OTP
exports.verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.otp !== otp || user.otpExpiresAt < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  // مسح الـ OTP بعد التحقق
  user.otp = null;
  user.otpExpiresAt = null;
  await user.save();

  res.status(200).json({ message: "OTP verified successfully" });
});

// تغيير كلمة المرور
exports.resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  // إزالة الحقول الخاصة بـ OTP
  user.otp = null;
  user.otpExpiresAt = null;
  await user.save();

  res.status(200).json({ message: "Password reset successfully" });
});

// Register
// Register
exports.register = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  const { username, email, password, role, level, studentInfo, teacherInfo } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // التحقق من الحقول المطلوبة للطلاب
  if (role === "student" && !level) {
    return res.status(400).json({ message: "Level is required for students." });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role,
    level: role === "student" ? level : undefined, // إضافة الـ level إذا كان المستخدم طالبًا
  });

  // Add student-specific info
  if (role === "student" && studentInfo) {
    const { dateOfBirth, grade, phoneNumber, fatherNumber, motherNumber, bloodGroup } = studentInfo;

    if (!dateOfBirth || !grade || !phoneNumber || !fatherNumber || !motherNumber || !bloodGroup) {
      return res.status(400).json({ message: "All student info fields are required." });
    }

    newUser.studentInfo = {
      dateOfBirth,
      grade,
      phoneNumber,
      fatherNumber,
      motherNumber,
      bloodGroup,
    };
  }

  // Add teacher-specific info
  if (role === "teacher" && teacherInfo) {
    const { subjects, classes, phoneNumber } = teacherInfo;

    if (!subjects || !classes || !phoneNumber) {
      return res.status(400).json({ message: "All teacher info fields are required." });
    }

    newUser.teacherInfo = {
      subjects,
      classes,
      phoneNumber,
    };
  }

  try {
    const user = await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        level: user.level || null,
        studentInfo: user.studentInfo || null,
        teacherInfo: user.teacherInfo || null,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to register user",
      error: err.message,
    });
  }
});

// Login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(400).json({ message: "Wrong password" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  const response = {
    message: "Login successful",
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };

  res.status(200).json(response);
});
