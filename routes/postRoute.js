const express = require("express");
const verifyToken = require("../middlewares/authMiddleware")
const {
  createPostValidator,
  updatePostValidator,
  likePostValidator,
  deletePostValidator,
  getPostValidator,
} = require("../utils/validators/postValidator");

const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  getTimelinePosts,
} = require("../services/postService");

const router = express.Router();
router.use(verifyToken)

router
  .route("/")
  .post(createPostValidator, createPost);

router
  .route("/timeline/all")
  .get(getTimelinePosts);

router
  .route("/:id")            //post ID
  .get(getPostValidator, getPost)
  .put(updatePostValidator, updatePost)     // inside it takes userId
  .delete(deletePostValidator, deletePost);

router
  .route("/:id/like")       //post ID
  .put(likePostValidator, likePost);      // inside it take userId

module.exports = router;
