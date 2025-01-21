const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    level: {
      type: Number, // المستوى الأكاديمي المرتبط بالجلسة
      required: true,
      min: 1,
    },
    date: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number, // المدة بالساعات
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
