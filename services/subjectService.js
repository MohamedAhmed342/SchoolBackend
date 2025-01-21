const asyncHandler = require("express-async-handler");
const Subject = require("../models/subjectModel");

// إضافة مادة جديدة (Admin فقط)
exports.createSubject = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  const { name, code, level, teacher } = req.body;

  if (!name || !code || !level || !teacher) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newSubject = new Subject({ name, code, level, teacher });
  await newSubject.save();

  res.status(201).json({ message: "Subject created successfully", subject: newSubject });
});

// تعديل مادة موجودة (Admin فقط)
exports.updateSubject = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  const subjectId = req.params.id;
  const updates = req.body;

  const updatedSubject = await Subject.findByIdAndUpdate(subjectId, { $set: updates }, { new: true });

  if (!updatedSubject) {
    return res.status(404).json({ message: "Subject not found." });
  }

  res.status(200).json({ message: "Subject updated successfully", subject: updatedSubject });
});

// حذف مادة (Admin فقط)
exports.deleteSubject = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  const subjectId = req.params.id;

  const deletedSubject = await Subject.findByIdAndDelete(subjectId);

  if (!deletedSubject) {
    return res.status(404).json({ message: "Subject not found." });
  }

  res.status(200).json({ message: "Subject deleted successfully" });
});

// جلب مادة معينة (Admin وTeacher)
exports.getSubject = asyncHandler(async (req, res) => {
  const subjectId = req.params.id;

  const foundSubject = await Subject.findById(subjectId).populate("teacher classes");

  if (!foundSubject) {
    return res.status(404).json({ message: "Subject not found." });
  }

  res.status(200).json(foundSubject);
});

// جلب كل المواد (Admin وTeacher)
exports.getAllSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find().populate("teacher classes");

  res.status(200).json(subjects);
});
