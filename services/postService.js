const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const User = require("../models/userModel");

// Create a post
exports.createPost = asyncHandler(async (req, res) => {
  try {
    const newPost = new Post({
      ...req.body,
      userId: req.user.id, // take user id from token
    });    
    const savedPost = await newPost.save();
    const user = await User.findById(req.user.id);
    if (user) {
      user.posts.push(savedPost._id);
      await user.save();
    }

    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: "Failed to create post", error: err.message });
  }
});


// Update a post
exports.updatePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json("Post not found");
    }

    if (post.userId === req.user.id) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("The Post has been updated");
    } else {
      res.status(403).json("You can update only your post");
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update post", error: err.message });
  }
});

// Delete a post
exports.deletePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json("Post not found");
    }

    if (post.userId === req.user.id || req.user.isAdmin) {
      await post.deleteOne();
      res.status(200).json("The Post has been deleted");
    } else {
      res.status(403).json("You can delete only your post");
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete post", error: err.message });
  }
});


// Like or dislike a post
exports.likePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json("Post not found");
    }

    if (!post.likes.includes(req.user.id)) {
      await post.updateOne({ $push: { likes: req.user.id } });
      res.status(200).json("The Post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.user.id } });
      res.status(200).json("The Post has been disliked");
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to like or dislike post", error: err.message });
  }
});

// Get a post
exports.getPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json("Post not found");
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch post", error: err.message });
  }
});

// Get timeline posts (all posts sorted by newest first)
exports.getTimelinePosts = asyncHandler(async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 }); // Fetch all posts, sorted by creation date (newest first)
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch timeline posts", error: err });
    }
  });
  
