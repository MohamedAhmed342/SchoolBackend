const express = require("express");
const {
  getParentReviewValidator,
  createParentReviewValidator,
  updateParentReviewValidator,
  deleteParentReviewValidator,
} = require("../utils/validators/parentReviewValidator");


const {
  getParentReviews,
  getParentReview,
  createParentReview,
  updateParentReview,
  deleteParentReview,
} = require("../services/parentReviewService");

const router = express.Router();

router
  .route("/")
  .get(getParentReviews)
  .post(createParentReviewValidator, createParentReview);

router
  .route("/:id")
  .get(getParentReviewValidator, getParentReview)
  .put(updateParentReviewValidator, updateParentReview)
  .delete(deleteParentReviewValidator, deleteParentReview);

module.exports = router;
