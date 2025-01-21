const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const {
  addExamResultValidator,
  getResultsForStudentValidator,
  getResultsForClassValidator
} = require("../utils/validators/examResultsValidator");

const {
  addExamResult,
  getResultsForStudent,
  getResultsForClass
} = require("../services/examResultService");

const router = express.Router();
router.use(verifyToken);

router.post("/", addExamResultValidator, addExamResult); // إضافة نتيجة امتحان
router.get("/student/:studentId", getResultsForStudentValidator, getResultsForStudent); // جلب نتائج طالب
router.get("/class/:classId", getResultsForClassValidator, getResultsForClass); // جلب نتائج فصل

module.exports = router;
