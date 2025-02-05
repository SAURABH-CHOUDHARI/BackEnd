const postModel = require("../models/postModel")
module.exports.homeController = async (req, res) => {
    const posts = await postModel.find({})
    res.render("home", { username: req.user.username , posts });
};