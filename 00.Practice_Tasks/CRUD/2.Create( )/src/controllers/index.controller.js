const userModel =require("../models/user.model");

module.exports.indexController = async (req,res) => {
    const {name, email} = req.body;
    const newUser = await userModel.create({
        name:name,
        email:email,
    });
    
    res.send(newUser);
}