const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

// Add Comment
exports.addComment = asyncHandler(async (req, res) => {
    try {
        // Create a new comment
        const comment = new Comment({
            postId: req.params.postId, // Take postId from params
            userId: req.user.id, // Take userId from token
            text: req.body.text,
            img: req.body.img || "",
        });

        // Save the comment to the database
        const savedComment = await comment.save();

        // Increment the commentsCount in the post
        await Post.findByIdAndUpdate(
            req.params.postId,
            { $inc: { commentsCount: 1 } } // Increment the comments count by 1
        );

        // Send the response
        res.status(200).json({
            message: "Comment added successfully",
            comment: savedComment,
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to add comment",
            error: err.message,
        });
    }
});
    


// Get Comments in a Post
exports.getCommentsInPost = asyncHandler(async (req, res) => {
    const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
});


// Like or Dislike Comment
exports.likeComment = asyncHandler(async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) return res.status(404).json({ message: "Comment not found" });

        const alreadyLiked = comment.likes.includes(req.user.id);

        if (alreadyLiked) {
            await comment.updateOne({ $pull: { likes: req.user.id } });
            res.status(200).json({ message: "Like removed" });
        } else {
            await comment.updateOne({ $push: { likes: req.user.id } });
            res.status(200).json({ message: "Comment liked" });
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to like/dislike comment", error: err.message });
    }
});


// Update Comment
exports.updateComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.userId.toString() === req.user.id) { // Use userId from token
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    text: req.body.text,
                    img: req.body.img,
                },
            },
            { new: true }
        );
        res.status(200).json(updatedComment);
    } else {
        res.status(403).json({ message: "You can update only your comment" });
    }
});

// Delete Comment
exports.deleteComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const post = await Post.findById(comment.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const isAuthorized =
        comment.userId.toString() === req.user.id || // comment maker
        post.userId.toString() === req.user.id || // post maker
        req.user.isAdmin; // admin

    if (isAuthorized) {
        await comment.deleteOne();
        await Post.findByIdAndUpdate(comment.postId, { $inc: { commentsCount: -1 } });
        res.status(200).json({ message: "Comment deleted" });
    } else {
        res.status(403).json({ message: "Unauthorized to delete this comment" });
    }
});

