module.exports.homeController = (req, res) => {
    res.render("home", { username: req.user.username });
};