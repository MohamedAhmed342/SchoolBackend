const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// Validator for creating a subject
exports.createSubjectValidator = [
  check("name")
    .notEmpty()
    .withMessage("Subject name is required")
    .isLength({ max: 100 })
    .withMessage("Subject name cannot exceed 100 characters"),
  check("code")
    .notEmpty()
    .withMessage("Subject code is required")
    .isLength({ max: 20 })
    .withMessage("Subject code cannot exceed 20 characters"),
  check("level")
    .notEmpty()
    .withMessage("Level is required")
    .isInt({ min: 1 })
    .withMessage("Level must be a positive integer"),
  check("teacher")
    .notEmpty()
    .withMessage("Teacher ID is required")
    .isMongoId()
    .withMessage("Invalid Teacher ID format"),
  validatorMiddleware,
];

// Validator for updating a subject
exports.updateSubjectValidator = [
  check("id")
    .notEmpty()
    .withMessage("Subject ID is required")
    .isMongoId()
    .withMessage("Invalid Subject ID format"),
  check("name")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Subject name cannot exceed 100 characters"),
  check("code")
    .optional()
    .isLength({ max: 20 })
    .withMessage("Subject code cannot exceed 20 characters"),
  check("level")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Level must be a positive integer"),
  validatorMiddleware,
];

// Validator for deleting a subject
exports.deleteSubjectValidator = [
  check("id")
    .notEmpty()
    .withMessage("Subject ID is required")
    .isMongoId()
    .withMessage("Invalid Subject ID format"),
  validatorMiddleware,
];

// Validator for getting a subject
exports.getSubjectValidator = [
  check("id")
    .notEmpty()
    .withMessage("Subject ID is required")
    .isMongoId()
    .withMessage("Invalid Subject ID format"),
  validatorMiddleware,
];
