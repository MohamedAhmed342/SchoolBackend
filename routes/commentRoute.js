const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");

const {
  addComment,
  getCommentsInPost,
  likeComment,
  updateComment,
  deleteComment,
} = require("../services/commentService");
const {
  addCommentValidator,
  likeCommentValidator,
  updateCommentValidator,
  deleteCommentValidator,
} = require("../utils/validators/commentValidator");

const router = express.Router();
router.use(verifyToken)


router
  .route("/:postId")    //post ID
  .get(getCommentsInPost)
  .post(addCommentValidator, addComment);


router
  .route("/:id/like")   //comment ID
  .put(likeCommentValidator, likeComment);

router
  .route("/:id")        //comment ID
  .put(updateCommentValidator, updateComment)
  .delete(deleteCommentValidator, deleteComment);

module.exports = router;
