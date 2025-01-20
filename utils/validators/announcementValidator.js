const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// Validator for getting a specific announcement by ID
exports.getAnnouncementValidator = [
  check("id").isMongoId().withMessage("Invalid announcement ID format"),
  validatorMiddleware,
];

// Validator for creating a new announcement
exports.createAnnouncementValidator = [
  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title is too short")
    .isLength({ max: 100 })
    .withMessage("Title is too long"),
  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description is too short")
    .isLength({ max: 2000 })
    .withMessage("Description is too long"),
  validatorMiddleware,
];

// Validator for updating an announcement
exports.updateAnnouncementValidator = [
  check("id").isMongoId().withMessage("Invalid announcement ID format"),
  check("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Title is too short")
    .isLength({ max: 100 })
    .withMessage("Title is too long"),
  check("description")
    .optional()
    .isLength({ min: 10 })
    .withMessage("Description is too short")
    .isLength({ max: 2000 })
    .withMessage("Description is too long"),
  validatorMiddleware,
];

// Validator for deleting an announcement
exports.deleteAnnouncementValidator = [
  check("id").isMongoId().withMessage("Invalid announcement ID format"),
  validatorMiddleware,
];
