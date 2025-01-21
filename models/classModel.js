const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    level: {
      type: Number, // المستوى الأكاديمي المرتبط بالفصل
      required: true,
      min: 1,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // الطلاب في الفصل
      },
    ],
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // المدرسين المرتبطين بالفصل
      },
    ],
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject", // المواد المرتبطة بالفصل
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);
