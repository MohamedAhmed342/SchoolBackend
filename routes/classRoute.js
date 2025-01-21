const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const {
  createClassValidator,
  updateClassValidator,
  deleteClassValidator,
  getClassValidator
} = require("../utils/validators/classValidator");

const {
  createClass,
  updateClass,
  deleteClass,
  getClass,
  getAllClasses
} = require("../services/classService");

const router = express.Router();
router.use(verifyToken);

router.post("/", createClassValidator, createClass); // إضافة فصل
router.put("/:id", updateClassValidator, updateClass); // تعديل فصل
router.delete("/:id", deleteClassValidator, deleteClass); // حذف فصل
router.get("/:id", getClassValidator, getClass); // جلب فصل معين
router.get("/", getAllClasses); // جلب كل الفصول

module.exports = router;
