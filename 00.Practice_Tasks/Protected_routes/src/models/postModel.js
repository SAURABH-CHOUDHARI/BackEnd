const mongoose = require("mongoose")

const postShcema = new mongoose.Schema({
    img : {
        type: String,
        required : true
    },
    cap : {
        type: String,
        required: true
    }
})

const postModel = mongoose.model("posts",postShcema)
module.exports = postModel;