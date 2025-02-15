const mongoose = require("mongoose")


const postSchema = new mongoose.Schema({
    media: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true
    }
})

postSchema.statics.feedPosts = async () => {
    return await postModel.aggregate([
        [
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: 'posts',
                    as: 'author'
                }
            },
            {
                $unwind: {
                    path: '$author',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1, 
                    media: 1, 
                    caption: 1, 
                    "author.username": 1 
                }
            }
        ]
    ])
}


const postModel = mongoose.model("post", postSchema)

module.exports = postModel