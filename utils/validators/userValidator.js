const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// Validator for updating user
exports.updateUserValidator = [
  check("id")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid User ID format"),
  check("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validatorMiddleware,
];

// Validator for deleting user
exports.deleteUserValidator = [
  check("id")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid User ID format"),
  validatorMiddleware,
];

// Validator for getting user
exports.getUserValidator = [
  check("id")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid User ID format"),
  validatorMiddleware,
];

// // Validator for following and unfollowing
// exports.followUserValidator = [
//   check("id")
//     .notEmpty()
//     .withMessage("Target User ID is required")
//     .isMongoId()
//     .withMessage("Invalid Target User ID format"),
//   check("userId")
//     .notEmpty()
//     .withMessage("Current User ID is required")
//     .isMongoId()
//     .withMessage("Invalid Current User ID format"),
//   validatorMiddleware,
// ];
