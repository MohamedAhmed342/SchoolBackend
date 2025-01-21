const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const {
  updateUser,
  deleteUser,
  getUser,
  // followUser,
  // unfollowUser,
} = require("../services/userService");
const {
  updateUserValidator,
  deleteUserValidator,
  getUserValidator,
  // followUserValidator,
} = require("../utils/validators/userValidator");

const router = express.Router();

// Middleware للتحقق من التوكن
router.use(verifyToken);

// Route لتحديث المستخدم
router
  .route("/:id")
  .put(updateUserValidator, updateUser) // تحديث بيانات المستخدم
  .delete(deleteUserValidator, deleteUser) // حذف المستخدم
  .get(getUserValidator, getUser); // جلب بيانات المستخدم

// Routes للتفاعل مع المتابعين (معلقة في الوقت الحالي)
// router
//   .route("/:id/follow")
//   .put(followUserValidator, followUser);

// router
//   .route("/:id/unfollow")
//   .put(followUserValidator, unfollowUser);

module.exports = router;
