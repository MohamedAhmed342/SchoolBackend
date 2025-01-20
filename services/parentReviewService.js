const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Review = require("../models/parentReviewModel");

// @desc Get List of parent reviews with pagination
// @route GET /api/v1/parent-reviews
// @access Public
exports.getParentReviews = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 2;
  const skip = (page - 1) * limit; // Ex: (2-1) * 2 = 2
  const reviews = await Review.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: reviews.length, page, data: reviews });
});

// @desc Get specific parent review by id
// @route GET /api/v1/parent-reviews/:id
// @access Public
exports.getParentReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findById(id);
  if (!review) {
    return next(new ApiError(`No review found for this id ${id}`, 404));
  }
  res.status(200).json({ data: review });
});

// @desc Create parent review
// @route POST /api/v1/parent-reviews
// @access Private
exports.createParentReview = asyncHandler(async (req, res) => {
  const { name, image, comment } = req.body;
  const review = await Review.create({ name, image, comment });
  res.status(201).json({ data: review });
});

// @desc Update specific parent review by id
// @route PUT /api/v1/parent-reviews/:id
// @access Private
exports.updateParentReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, image, comment } = req.body;

  const review = await Review.findByIdAndUpdate(
    id,
    { name, image, comment },
    { new: true }
  );

  if (!review) {
    return next(new ApiError(`No review found for this id ${id}`, 404));
  }
  res.status(200).json({ data: review });
});

// @desc Delete specific parent review by id
// @route DELETE /api/v1/parent-reviews/:id
// @access Private
exports.deleteParentReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findByIdAndDelete(id);
  if (!review) {
    return next(new ApiError(`No review found for this id ${id}`, 404));
  }
  res.status(204).send();
});
