const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// Validator for creating a post
exports.createPostValidator = [
  // Validate optional description with a maximum length of 500 characters
  check("desc")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
  // Validate optional image as a valid URL
  check("img")
    .optional()
    .isURL()
    .withMessage("Image must be a valid URL"),
  // Apply validator middleware
  validatorMiddleware,
];

// Validator for updating a post
exports.updatePostValidator = [
  // Validate post ID (required and should be a valid MongoDB ID)
  check("id")
    .notEmpty()
    .withMessage("Post ID is required")
    .isMongoId()
    .withMessage("Invalid Post ID format"),
  // Validate optional description with a maximum length of 500 characters
  check("desc")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
  // Validate optional image as a valid URL
  check("img")
    .optional()
    .isURL()
    .withMessage("Image must be a valid URL"),
  // Apply validator middleware
  validatorMiddleware,
];

// Validator for liking or disliking a post
exports.likePostValidator = [
  // Validate post ID (required and should be a valid MongoDB ID)
  check("id")
    .notEmpty()
    .withMessage("Post ID is required")
    .isMongoId()
    .withMessage("Invalid Post ID format"),
  // Apply validator middleware
  validatorMiddleware,
];

// Validator for deleting a post
exports.deletePostValidator = [
  // Validate post ID (required and should be a valid MongoDB ID)
  check("id")
    .notEmpty()
    .withMessage("Post ID is required")
    .isMongoId()
    .withMessage("Invalid Post ID format"),
  // Apply validator middleware
  validatorMiddleware,
];

// Validator for getting a post
exports.getPostValidator = [
  // Validate post ID (required and should be a valid MongoDB ID)
  check("id")
    .notEmpty()
    .withMessage("Post ID is required")
    .isMongoId()
    .withMessage("Invalid Post ID format"),
  // Apply validator middleware
  validatorMiddleware,
];
