const asyncHandler = require("express-async-handler");
const ExamResult = require("../models/examResultModel");
const Class = require("../models/classModel");
const User = require("../models/userModel");

// إضافة نتيجة امتحان (Teacher فقط)
exports.addExamResult = asyncHandler(async (req, res) => {
  if (req.user.role !== "teacher") {
    return res.status(403).json({ message: "Access denied. Teachers only." });
  }

  const { studentId, subjectId, marks, totalMarks, classId } = req.body;

  if (!studentId || !subjectId || !marks || !totalMarks || !classId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newResult = new ExamResult({
    student: studentId,
    subject: subjectId,
    marks,
    totalMarks,
    classId,
  });

  const savedResult = await newResult.save();

  res.status(201).json({
    message: "Exam result added successfully",
    result: savedResult,
  });
});

// عرض نتائج طالب معين (Teacher وAdmin)
exports.getResultsForStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  const results = await ExamResult.find({ student: studentId })
    .populate("subject classId")
    .sort({ examDate: -1 });

  res.status(200).json(results);
});

// عرض نتائج فصل معين (Teacher وAdmin)
exports.getResultsForClass = asyncHandler(async (req, res) => {
  const { classId } = req.params;

  const results = await ExamResult.find({ classId })
    .populate("student subject")
    .sort({ examDate: -1 });

  res.status(200).json(results);
});
