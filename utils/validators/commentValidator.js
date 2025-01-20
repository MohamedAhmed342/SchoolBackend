const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// Validator for adding a comment
exports.addCommentValidator = [
  check("text")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Text cannot exceed 500 characters"),
  check("img")
    .optional()
    .isURL()
    .withMessage("Image must be a valid URL"),
  validatorMiddleware,
];

// Validator for liking or disliking a comment
exports.likeCommentValidator = [
  check("id")
    .notEmpty()
    .withMessage("Comment ID is required")
    .isMongoId()
    .withMessage("Invalid Comment ID format"),
];

// Validator for updating a comment
exports.updateCommentValidator = [
  check("id")
    .notEmpty()
    .withMessage("Comment ID is required")
    .isMongoId()
    .withMessage("Invalid Comment ID format"),
  check("text")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Text cannot exceed 500 characters"),
  check("img")
    .optional()
    .isURL()
    .withMessage("Image must be a valid URL"),
  validatorMiddleware,
];

// Validator for deleting a comment
exports.deleteCommentValidator = [
  check("id")
    .notEmpty()
    .withMessage("Comment ID is required")
    .isMongoId()
    .withMessage("Invalid Comment ID format"),
  validatorMiddleware,
];
