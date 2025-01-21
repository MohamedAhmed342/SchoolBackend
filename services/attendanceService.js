const asyncHandler = require("express-async-handler");
const Attendance = require("../models/attendanceModel");
const Class = require("../models/classModel");
const User = require("../models/userModel");

// تسجيل الحضور (Teacher فقط)
exports.markAttendance = asyncHandler(async (req, res) => {
  if (req.user.role !== "teacher") {
    return res.status(403).json({ message: "Access denied. Teachers only." });
  }

  const { classId, subjectId, attendance } = req.body; // attendance: Array of { studentId, status }

  if (!classId || !subjectId || !attendance || !Array.isArray(attendance)) {
    return res.status(400).json({ message: "Invalid data provided." });
  }

  // Verify class and students
  const foundClass = await Class.findById(classId);
  if (!foundClass) {
    return res.status(404).json({ message: "Class not found." });
  }

  // Save attendance records
  const attendanceRecords = await Attendance.insertMany(
    attendance.map((record) => ({
      student: record.studentId,
      subject: subjectId,
      classId,
      status: record.status,
    }))
  );

  res.status(201).json({
    message: "Attendance marked successfully",
    records: attendanceRecords,
  });
});

// عرض حضور فصل معين (Teacher وAdmin)
exports.getAttendanceForClass = asyncHandler(async (req, res) => {
  const { classId } = req.params;

  const attendanceRecords = await Attendance.find({ classId })
    .populate("student subject")
    .sort({ date: -1 });

  res.status(200).json(attendanceRecords);
});

// عرض حضور طالب معين (Teacher وAdmin)
exports.getAttendanceForStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  const attendanceRecords = await Attendance.find({ student: studentId })
    .populate("subject classId")
    .sort({ date: -1 });

  res.status(200).json(attendanceRecords);
});
