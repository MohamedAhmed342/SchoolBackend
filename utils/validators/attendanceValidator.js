const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// Validator for marking attendance
exports.markAttendanceValidator = [
  check("classId")
    .notEmpty()
    .withMessage("Class ID is required")
    .isMongoId()
    .withMessage("Invalid Class ID format"),
  check("subjectId")
    .notEmpty()
    .withMessage("Subject ID is required")
    .isMongoId()
    .withMessage("Invalid Subject ID format"),
  check("attendance")
    .isArray()
    .withMessage("Attendance must be an array")
    .notEmpty()
    .withMessage("Attendance array cannot be empty"),
  validatorMiddleware,
];

// Validator for getting attendance for a class
exports.getAttendanceForClassValidator = [
  check("classId")
    .notEmpty()
    .withMessage("Class ID is required")
    .isMongoId()
    .withMessage("Invalid Class ID format"),
  validatorMiddleware,
];

// Validator for getting attendance for a student
exports.getAttendanceForStudentValidator = [
  check("studentId")
    .notEmpty()
    .withMessage("Student ID is required")
    .isMongoId()
    .withMessage("Invalid Student ID format"),
  validatorMiddleware,
];
