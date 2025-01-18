const userModel = require("../models/user.model")



module.exports.indexController = (req, res) => {
    res.render("index");
};

module.exports.registerController = async (req, res) => {
    const {username,email,password} = req.query

    const newUser = new userModel({
        username: username,
        email: email,
        password:password
    })
    
    await newUser.save()
    
    res.send(newUser)

};
module.exports.getUsersController = async (req, res) => {
    const users = await userModel.find()
    res.send(users)
}
module.exports.updateUserController = async (req,res) => {

    await userModel.findOneAndUpdate({
        email:"a@a.com"
    },
    {
        username:"changed"
    })
    const user = await userModel.find({username:"changed"})
    res.send(user)

}
module.exports.deleteUserController = async (req,res) => {

    await userModel.findOneAndDelete({
        email:"a@a.com"
    })
    const users = await userModel.find()
    res.send(users)
}
