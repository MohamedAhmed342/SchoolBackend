const asyncHandler = require("express-async-handler");
const Class = require("../models/classModel");

// إضافة فصل جديد (Admin فقط)
exports.createClass = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  const { name, level } = req.body;

  if (!name || !level) {
    return res.status(400).json({ message: "Name and level are required." });
  }

  const newClass = new Class({ name, level });
  await newClass.save();

  res.status(201).json({ message: "Class created successfully", class: newClass });
});

// تعديل فصل موجود (Admin فقط)
exports.updateClass = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  const classId = req.params.id;
  const updates = req.body;

  const updatedClass = await Class.findByIdAndUpdate(classId, { $set: updates }, { new: true });

  if (!updatedClass) {
    return res.status(404).json({ message: "Class not found." });
  }

  res.status(200).json({ message: "Class updated successfully", class: updatedClass });
});

// حذف فصل (Admin فقط)
exports.deleteClass = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  const classId = req.params.id;

  const deletedClass = await Class.findByIdAndDelete(classId);

  if (!deletedClass) {
    return res.status(404).json({ message: "Class not found." });
  }

  res.status(200).json({ message: "Class deleted successfully" });
});

// جلب فصل معين (Admin وTeacher)
exports.getClass = asyncHandler(async (req, res) => {
  const classId = req.params.id;

  const foundClass = await Class.findById(classId).populate("students teachers subjects");

  if (!foundClass) {
    return res.status(404).json({ message: "Class not found." });
  }

  res.status(200).json(foundClass);
});

// جلب كل الفصول (Admin وTeacher)
exports.getAllClasses = asyncHandler(async (req, res) => {
  const classes = await Class.find().populate("students teachers subjects");

  res.status(200).json(classes);
});
