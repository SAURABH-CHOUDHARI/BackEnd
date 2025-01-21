const userModel =require("../models/user.model");

module.exports.indexController = async (req,res) => {
    const {name, email} = req.body;
    const newUser = new userModel({
        name:name,
        email:email,
    });
    await newUser.save();
    res.send(newUser);
}