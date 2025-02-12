const postModel = require("../models/post.model")

module.exports.feedController = async (req,res) => {
    const posts = await postModel.find()

    res.status(200).json({message:"posts fetched successfully" , posts})
}