const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// Validator for user registration
exports.registerValidator = [
  check("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validatorMiddleware,
];

// Validator for user login
exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  check("password")
    .notEmpty()
    .withMessage("Password is required"),
  validatorMiddleware,
];

exports.sendOTPValidator = [
  check("email").isEmail().withMessage("Invalid email address"),
  validatorMiddleware,
];

// Validator للتحقق من OTP
exports.verifyOTPValidator = [
  check("email").isEmail().withMessage("Invalid email address"),
  check("otp")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 digits"),
  validatorMiddleware,
];

// Validator لتغيير كلمة المرور
exports.resetPasswordValidator = [
  check("email").isEmail().withMessage("Invalid email address"),
  check("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validatorMiddleware,
];