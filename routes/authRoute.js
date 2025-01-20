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

router
  .route("/register")
  .post(verifyToken, registerValidator, register);

router
  .route("/login")
  .post(loginValidator, login);

router.post("/send-otp", sendOTPValidator, sendOTP);

router.post("/verify-otp", verifyOTPValidator, verifyOTP);

router.post("/reset-password", resetPasswordValidator, resetPassword);


module.exports = router;


