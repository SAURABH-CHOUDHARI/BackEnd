const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    media: {
        type: Object,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }]
}, { timestamps: true }); // Adds `createdAt` and `updatedAt` fields

// Cursor-based pagination for Instagram-style feed
postSchema.statics.getRecentPosts = async function (cursor = null, limit = 15) {
    const query = cursor
        ? { createdAt: { $lt: cursor } } // Get posts before the given timestamp
        : {};

    const posts = await this.find(query)
        .sort({ createdAt: -1 }) // Newest posts first
        .limit(limit)
        .populate("author", "username profileImage") // Populate author info
        .populate("likes", "username"); // Populate liked users

    return posts;
};

const postModel = mongoose.model("post", postSchema);
module.exports = postModel;
