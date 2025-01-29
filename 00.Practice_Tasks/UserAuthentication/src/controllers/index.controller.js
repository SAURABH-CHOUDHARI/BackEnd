const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")

module.exports.indexController = (req,res) => {
    res.render("index")
}
module.exports.loginController = (req,res) => {
    res.render("login")
}
module.exports.loginUserController = async (req,res) => {
    try{
        const {email,password} = req.body
        const user = await userModel.findOne({
            email
        })
        if(!user){
            return res.status(400).json({
                message: "Invalid email or Password"
            })
        }
        const isMatched =  await bcrypt.compare(password,user.password)
        if(!isMatched){
            return res.status(400).json({
                message: "Invalid email or Password"
            })
        }
        res.status(201).json({
            message: "User logged in successfully"
        })


    }catch{
        res.status(400).json({
            message: err.message
        })
    }

}
module.exports.signUpController = (req,res) => {
    res.render("sign-up")
}
module.exports.createUserController = async (req,res) => {
    try{

        const {username,email,profileImg,bio,password} = req.body
        
        const hashpass = await bcrypt.hash(password,10)
        
        const newUser = await userModel.create({
            username,
            email,
            profileImg,
            bio,
            password:hashpass
        })
        res.status(201).json({
            username,
            message: "User is created successfully"
        })
        res.redirect('/users')
    }
    catch(err){
        // res.send(err.message)
        res.status(400).json({
            message: err.message
        })
    }
}
module.exports.homeController = (req,res) => {
    res.send("Sign home")
}