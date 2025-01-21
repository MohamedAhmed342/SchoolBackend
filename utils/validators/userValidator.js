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
  check("role")
    .optional()
    .isIn(["student", "teacher", "admin"])
    .withMessage("Role must be either 'student', 'teacher', or 'admin'"),
  // Validations for studentInfo
  check("studentInfo.dateOfBirth")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format. Use ISO8601 format (YYYY-MM-DD)."),
  check("studentInfo.grade")
    .optional()
    .isIn(["Primary", "Preparatory", "Secondary", "High School", "College"])
    .withMessage("Grade must be one of Primary, Preparatory, Secondary, High School, or College"),
  check("studentInfo.phoneNumber")
    .optional()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 digits")
    .isNumeric()
    .withMessage("Phone number must contain only numbers"),
  check("studentInfo.fatherNumber")
    .optional()
    .isLength({ min: 10, max: 10 })
    .withMessage("Father's phone number must be 10 digits")
    .isNumeric()
    .withMessage("Father's phone number must contain only numbers"),
  check("studentInfo.motherNumber")
    .optional()
    .isLength({ min: 10, max: 10 })
    .withMessage("Mother's phone number must be 10 digits")
    .isNumeric()
    .withMessage("Mother's phone number must contain only numbers"),
  check("studentInfo.bloodGroup")
    .optional()
    .isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .withMessage("Invalid blood group"),
  // Validations for teacherInfo
  check("teacherInfo.phoneNumber")
    .optional()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 digits")
    .isNumeric()
    .withMessage("Phone number must contain only numbers"),
  check("teacherInfo.subjects")
    .optional()
    .isArray()
    .withMessage("Subjects must be an array of IDs"),
  check("teacherInfo.subjects.*")
    .optional()
    .isMongoId()
    .withMessage("Invalid Subject ID in subjects array"),
  check("teacherInfo.classes")
    .optional()
    .isArray()
    .withMessage("Classes must be an array of IDs"),
  check("teacherInfo.classes.*")
    .optional()
    .isMongoId()
    .withMessage("Invalid Class ID in classes array"),
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
