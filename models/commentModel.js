const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    postId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        max: 500,
    },
    img: { 
        type: String,
        default: "",
    },
    likes: { 
        type: Array,
        default: [],
    },
}, { timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);
