const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// Validator for adding exam result
exports.addExamResultValidator = [
  check("studentId")
    .notEmpty()
    .withMessage("Student ID is required")
    .isMongoId()
    .withMessage("Invalid Student ID format"),
  check("subjectId")
    .notEmpty()
    .withMessage("Subject ID is required")
    .isMongoId()
    .withMessage("Invalid Subject ID format"),
  check("classId")
    .notEmpty()
    .withMessage("Class ID is required")
    .isMongoId()
    .withMessage("Invalid Class ID format"),
  check("marks")
    .notEmpty()
    .withMessage("Marks are required")
    .isInt({ min: 0 })
    .withMessage("Marks must be a non-negative integer"),
  check("totalMarks")
    .notEmpty()
    .withMessage("Total Marks are required")
    .isInt({ min: 1 })
    .withMessage("Total Marks must be a positive integer"),
  validatorMiddleware,
];

// Validator for getting results for a student
exports.getResultsForStudentValidator = [
  check("studentId")
    .notEmpty()
    .withMessage("Student ID is required")
    .isMongoId()
    .withMessage("Invalid Student ID format"),
  validatorMiddleware,
];

// Validator for getting results for a class
exports.getResultsForClassValidator = [
  check("classId")
    .notEmpty()
    .withMessage("Class ID is required")
    .isMongoId()
    .withMessage("Invalid Class ID format"),
  validatorMiddleware,
];
