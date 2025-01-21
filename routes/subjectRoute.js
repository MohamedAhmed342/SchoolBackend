const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const {
  createSubjectValidator,
  updateSubjectValidator,
  deleteSubjectValidator,
  getSubjectValidator
} = require("../utils/validators/subjectValidator");

const {
  createSubject,
  updateSubject,
  deleteSubject,
  getSubject,
  getAllSubjects
} = require("../services/subjectService");

const router = express.Router();
router.use(verifyToken);

router.post("/", createSubjectValidator, createSubject); // إضافة مادة
router.put("/:id", updateSubjectValidator, updateSubject); // تعديل مادة
router.delete("/:id", deleteSubjectValidator, deleteSubject); // حذف مادة
router.get("/:id", getSubjectValidator, getSubject); // جلب مادة معينة
router.get("/", getAllSubjects); // جلب كل المواد

module.exports = router;
