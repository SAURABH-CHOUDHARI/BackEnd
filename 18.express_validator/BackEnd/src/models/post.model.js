const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    media: {
        type: String,
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
});


const postModel = mongoose.model("post", postSchema);
module.exports = postModel;