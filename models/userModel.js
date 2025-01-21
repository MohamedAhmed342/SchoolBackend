const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"], // الأدوار الممكنة
      required: true,
    },
    level: {
      type: Number, // المستوى الأكاديمي
      min: 1,
      required: function () {
        return this.role === "student"; // خاص بالطلاب فقط
      },
    },
    // بيانات خاصة بالطلاب
    studentInfo: {
      dateOfBirth: {
        type: Date,
        required: function () {
          return this.role === "student"; // مطلوب إذا كان المستخدم طالب
        },
      },
      grade: {
        type: String,
        enum: [
          "Primary",
          "Preparatory",
          "Secondary",
          "High School",
          "College",
        ], // المراحل الدراسية المتاحة
        required: function () {
          return this.role === "student";
        },
      },
      phoneNumber: {
        type: String,
        match: [/^\d{10}$/, "Invalid phone number format"],
        required: function () {
          return this.role === "student";
        },
      },
      fatherNumber: {
        type: String,
        match: [/^\d{10}$/, "Invalid father's phone number format"],
        required: function () {
          return this.role === "student";
        },
      },
      motherNumber: {
        type: String,
        match: [/^\d{10}$/, "Invalid mother's phone number format"],
        required: function () {
          return this.role === "student";
        },
      },
      bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        required: function () {
          return this.role === "student";
        },
      },
    },
    // بيانات خاصة بالمدرسين
    teacherInfo: {
      subjects: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject", // المواد التي يدرسها المدرس
        },
      ],
      classes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Class", // الفصول التي يدرس فيها المدرس
        },
      ],
      phoneNumber: {
        type: String,
        match: [/^\d{10}$/, "Invalid phone number format"],
        required: function () {
          return this.role === "teacher";
        },
      },
    },
    otp: {
      type: String,
    },
    otpExpiresAt: {
      type: Date,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
