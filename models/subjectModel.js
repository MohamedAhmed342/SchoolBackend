const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String, // كود المادة
      unique: true,
      required: true,
    },
    level: {
      type: Number, // المستوى الأكاديمي المرتبط بالمادة
      required: true,
      min: 1,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // المدرس المسؤول عن المادة
    },
    classes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class", // الفصول التي تحتوي المادة
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
