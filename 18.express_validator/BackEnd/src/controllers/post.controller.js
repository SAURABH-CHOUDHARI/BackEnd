const postModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const { uploadBufferStream } = require("../services/images.cdn");

module.exports.createPostController = async (req, res) => {
    try {
        const userId = req.user._id;
        

        if (!req.file) {
            return res.status(400).json({ message: "Media file is required" });
        }

        const fileBuffer = req.file.buffer;
        const fileName = req.file.originalname;
        const uploadedMedia = await uploadBufferStream(fileBuffer, fileName);


        if (!uploadedMedia?.url) {
            return res.status(500).json({ message: "Failed to upload media" });
        }

        const { caption } = req.body;
        if (!caption) {
            return res.status(400).json({ message: "Caption required" });
        }

        const newPost = await postModel.create({
            media: uploadedMedia.url,
            caption,
            userId,
        });

        await UserModel.findByIdAndUpdate(userId, {
            $push: { posts: newPost._id },
        });

        res.status(201).json({ message: "Post Created", newPost });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};