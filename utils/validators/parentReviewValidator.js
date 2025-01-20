const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// Validator for getting a specific parent review by ID
exports.getParentReviewValidator = [
  check("id").isMongoId().withMessage("Invalid parent review ID format"),
  validatorMiddleware,
];

// Validator for creating a new parent review
exports.createParentReviewValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name is too short")
    .isLength({ max: 50 })
    .withMessage("Name is too long"),
  check("image")
    .notEmpty()
    .withMessage("Image is required")
    .isURL()
    .withMessage("Invalid image URL format"),
  check("comment")
    .notEmpty()
    .withMessage("Comment is required")
    .isLength({ min: 5 })
    .withMessage("Comment is too short")
    .isLength({ max: 500 })
    .withMessage("Comment is too long"),
  validatorMiddleware,
];

// Validator for updating a parent review
exports.updateParentReviewValidator = [
  check("id").isMongoId().withMessage("Invalid parent review ID format"),
  validatorMiddleware,
];

// Validator for deleting a parent review
exports.deleteParentReviewValidator = [
  check("id").isMongoId().withMessage("Invalid parent review ID format"),
  validatorMiddleware,
];
