const postModel = require("../models/post.model");
const UserModel = require("../models/user.model");

module.exports.createPostController = async (req, res) => {
    try {
        const { caption } = req.body;
        console.log(req.body.image)
        if (!caption) {
            return res.status(400).json({ message: "Caption required" });
        }

        const newPost = await postModel.create({
            media: {
                id:req.body.image.fileId,
                url:req.body.image.url,
                thumbnailUrl: req.body.image.thumbnailUrl,

            },
            caption,
            author: req.user._id,
        });

        await UserModel.findByIdAndUpdate(req.user._id, {
            $push: { posts: newPost._id },
        });

        res.status(201).json({ message: "Post Created", newPost });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



module.exports.feedController = async (req, res) => {
    try {
        const cursor = req.query.cursor || null; 
        const limit = 15; 

        const posts = await postModel.getRecentPosts(cursor, limit);

        const nextCursor = posts.length > 0 ? posts[posts.length - 1].createdAt : null;

        res.status(200).json({
            success: true,
            posts,
            nextCursor 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
