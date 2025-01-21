const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// Validator for creating a class
exports.createClassValidator = [
  check("name")
    .notEmpty()
    .withMessage("Class name is required")
    .isLength({ max: 100 })
    .withMessage("Class name cannot exceed 100 characters"),
  check("level")
    .notEmpty()
    .withMessage("Level is required")
    .isInt({ min: 1 })
    .withMessage("Level must be a positive integer"),
  validatorMiddleware,
];

// Validator for updating a class
exports.updateClassValidator = [
  check("id")
    .notEmpty()
    .withMessage("Class ID is required")
    .isMongoId()
    .withMessage("Invalid Class ID format"),
  check("name")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Class name cannot exceed 100 characters"),
  check("level")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Level must be a positive integer"),
  validatorMiddleware,
];

// Validator for deleting a class
exports.deleteClassValidator = [
  check("id")
    .notEmpty()
    .withMessage("Class ID is required")
    .isMongoId()
    .withMessage("Invalid Class ID format"),
  validatorMiddleware,
];

// Validator for getting a class
exports.getClassValidator = [
  check("id")
    .notEmpty()
    .withMessage("Class ID is required")
    .isMongoId()
    .withMessage("Invalid Class ID format"),
  validatorMiddleware,
];
