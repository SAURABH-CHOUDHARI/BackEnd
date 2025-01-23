const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    img:{
        type: String,
    },
    cap: {
        type: String,
    },
    likeCount : {
        type:Number,
        default: 0,
    },
})

const postModel = mongoose.model("posts",postSchema)

module.exports = postModel