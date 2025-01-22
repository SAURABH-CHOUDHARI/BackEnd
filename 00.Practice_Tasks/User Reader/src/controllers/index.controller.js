const userModel = require("../models/user.model")

module.exports.formController = (req, res) => {
    res.render("form")
}
module.exports.createController = async (req, res) => {
    const { name, email, bio, image } = req.body

    const newUser = await userModel.create({
        name,
        email,
        bio,
        image,
    })
    res.redirect("users")
}
module.exports.allUsersController = async (req, res) => {
    const allUsers = await userModel.find()
    
    res.render("users",{allUsers})
}
module.exports.findUserController = async (req, res) => {
    const id = req.params.id

    const foundUser = await userModel.findOne({ _id: id })
    res.render("user", {foundUser})
}