const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// Validator for user registration
exports.registerValidator = [
  check("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  check("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["student", "teacher", "admin"])
    .withMessage("Role must be either 'student', 'teacher', or 'admin'"),
  // Validations for studentInfo (if role is student)
  check("studentInfo.dateOfBirth")
    .if(check("role").equals("student"))
    .notEmpty()
    .withMessage("Date of Birth is required for students")
    .isISO8601()
    .withMessage("Invalid date format. Use ISO8601 format (YYYY-MM-DD)."),
  check("studentInfo.grade")
    .if(check("role").equals("student"))
    .notEmpty()
    .withMessage("Grade is required for students")
    .isIn(["Primary", "Preparatory", "Secondary", "High School", "College"])
    .withMessage("Invalid grade value"),
  check("studentInfo.phoneNumber")
    .if(check("role").equals("student"))
    .notEmpty()
    .withMessage("Phone number is required for students")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 digits")
    .isNumeric()
    .withMessage("Phone number must contain only numbers"),
  check("studentInfo.fatherNumber")
    .if(check("role").equals("student"))
    .notEmpty()
    .withMessage("Father's phone number is required for students")
    .isLength({ min: 10, max: 10 })
    .withMessage("Father's phone number must be 10 digits")
    .isNumeric()
    .withMessage("Father's phone number must contain only numbers"),
  check("studentInfo.motherNumber")
    .if(check("role").equals("student"))
    .notEmpty()
    .withMessage("Mother's phone number is required for students")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mother's phone number must be 10 digits")
    .isNumeric()
    .withMessage("Mother's phone number must contain only numbers"),
  check("studentInfo.bloodGroup")
    .if(check("role").equals("student"))
    .notEmpty()
    .withMessage("Blood group is required for students")
    .isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .withMessage("Invalid blood group"),
  // Validations for teacherInfo (if role is teacher)
  check("teacherInfo.subjects")
    .if(check("role").equals("teacher"))
    .notEmpty()
    .withMessage("Subjects are required for teachers")
    .isArray()
    .withMessage("Subjects must be an array of IDs"),
  check("teacherInfo.subjects.*")
    .optional()
    .isMongoId()
    .withMessage("Invalid Subject ID in subjects array"),
  check("teacherInfo.classes")
    .if(check("role").equals("teacher"))
    .notEmpty()
    .withMessage("Classes are required for teachers")
    .isArray()
    .withMessage("Classes must be an array of IDs"),
  check("teacherInfo.classes.*")
    .optional()
    .isMongoId()
    .withMessage("Invalid Class ID in classes array"),
  check("teacherInfo.phoneNumber")
    .if(check("role").equals("teacher"))
    .notEmpty()
    .withMessage("Phone number is required for teachers")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 digits")
    .isNumeric()
    .withMessage("Phone number must contain only numbers"),
  validatorMiddleware,
];

// Validator for user login
exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  check("password")
    .notEmpty()
    .withMessage("Password is required"),
  validatorMiddleware,
];

exports.sendOTPValidator = [
  check("email").isEmail().withMessage("Invalid email address"),
  validatorMiddleware,
];

// Validator للتحقق من OTP
exports.verifyOTPValidator = [
  check("email").isEmail().withMessage("Invalid email address"),
  check("otp")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 digits"),
  validatorMiddleware,
];

// Validator لتغيير كلمة المرور
exports.resetPasswordValidator = [
  check("email").isEmail().withMessage("Invalid email address"),
  check("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validatorMiddleware,
];
