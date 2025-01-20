const mongoose = require("mongoose");

// Create Schema
const reviewParentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name required"],
      minlength: [3, "Too short Name"],
      maxlength: [32, "Too long Name"],
    },
    image: {
      type: String,
      required: true,
    },
    comment: {
        type: String,
        required: true,
      },
    },
  { timestamps: true }
);

// Create ReviewParent
const ReviewParentModel = mongoose.model("ParentReview", reviewParentSchema);

module.exports = ReviewParentModel;
