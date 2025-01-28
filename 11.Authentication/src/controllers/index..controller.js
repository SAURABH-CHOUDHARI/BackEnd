const userModel = require("../models/user.model")
const postModel = require("../models/post.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

module.exports.userFormController = (req, res) => {
    res.render("userForm")
}
module.exports.createUserController = async (req, res) => {
    const { username, email, profilePic, bio, password } = req.body

    const hash = await bcrypt.hash(password, 10)

    const newUser = await userModel.create({
        username,
        profilePic: profilePic,
        email,
        bio,
        password: hash
    })
    res.redirect("/home")
}
module.exports.userLoginController = async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.findOne({
        email
    })
    if (await bcrypt.compare(password, user.password)) {
        res.redirect("/home")
    } else {
        res.redirect('/login')
    }
}
module.exports.loginController = async (req, res) => {
    res.render('login')
}
module.exports.homeController = async (req, res) => {
    const posts = await postModel.find()
    res.render("home", { posts })
}
module.exports.postFormController = async (req, res) => {
    res.render("postForm")
}
module.exports.likeController = async (req, res) => {
    try {
        const { id } = req.body;
        const updatedPost = await postModel.findOneAndUpdate(
            { _id: id },
            { $inc: { likeCount: 1 } },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ success: false, error: "Post not found" });
        }

        res.json({ success: true, likeCount: updatedPost.likeCount });
    } catch (error) {
        res.status(500).json({ success: false, error: "An error occurred while updating likes" });
    }
};



module.exports.createPostController = async (req, res) => {
    const { img, cap } = req.body
    const newPost = await postModel.create({
        img,
        cap,
    })
    res.redirect("/home")
}
module.exports.deletePostController = async (req, res) => {
    try {
        const { id } = req.query;
        const deletedPost = await postModel.findOneAndDelete({ _id: id });

        if (!deletedPost) {
            return res.status(404).json({ success: false, error: "Post not found" });
        }

        res.json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: "An error occurred while deleting the post" });
    }
};
