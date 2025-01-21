const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const {
  registerValidator,
  loginValidator,
  sendOTPValidator,
  verifyOTPValidator,
  resetPasswordValidator,
} = require("../utils/validators/authValidator");

const {
  register,
  login,
  sendOTP,
  verifyOTP,
  resetPassword,
} = require("../services/authService");

const router = express.Router();

// Register a new user (Admins only)
router
  .route("/register")
  .post(verifyToken, registerValidator, register);

// User login
router
  .route("/login")
  .post(loginValidator, login);

// Send OTP
router.post("/send-otp", sendOTPValidator, sendOTP);

// Verify OTP
router.post("/verify-otp", verifyOTPValidator, verifyOTP);

// Reset password
router.post("/reset-password", resetPasswordValidator, resetPassword);

module.exports = router;
