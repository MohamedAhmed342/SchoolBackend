const express = require("express");
const verifyToken = require('../middlewares/authMiddleware')
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
router.use(verifyToken);

router
  .route("/:id")
  .put(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser)
  .get(getUserValidator, getUser);

// router
//   .route("/:id/follow")
//   .put(followUserValidator, followUser);

// router
//   .route("/:id/unfollow")
//   .put(followUserValidator, unfollowUser);

module.exports = router;
