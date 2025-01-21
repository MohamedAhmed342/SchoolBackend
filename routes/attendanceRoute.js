const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const {
  markAttendanceValidator,
  getAttendanceForClassValidator,
  getAttendanceForStudentValidator
} = require("../utils/validators/attendanceValidator");

const {
  markAttendance,
  getAttendanceForClass,
  getAttendanceForStudent
} = require("../services/attendanceService");

const router = express.Router();
router.use(verifyToken);

router.post("/", markAttendanceValidator, markAttendance); // تسجيل الحضور
router.get("/class/:classId", getAttendanceForClassValidator, getAttendanceForClass); // جلب حضور فصل
router.get("/student/:studentId", getAttendanceForStudentValidator, getAttendanceForStudent); // جلب حضور طالب

module.exports = router;
