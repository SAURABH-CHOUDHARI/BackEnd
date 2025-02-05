const bcrypt = require('bcrypt')
const userModel = require("../models/userModel")
const postModel = require("../models/postModel")
const jwt = require('jsonwebtoken')

module.exports.registerController = (req, res) => {
    res.render('register')
}
module.exports.loginController = (req, res) => {
    res.render('login')
}
module.exports.registerUserController = async (req, res) => {
    try {

        const { username, email, password } = req.body

        const hashPass = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({
            username,
            email,
            password: hashPass
        })

        const token = jwt.sign({
            _id: newUser._id,
            username: newUser.username

        },
            process.env.JWT_SECRET
        )
        if (!token) {
            return res.redirect("/")
        }
        res.cookie('token', token)
        res.redirect("/home")
    } catch (err) {
        res.status(502).json({ message: "Bad Gateway 502", error: err.message })
    }
}
module.exports.loginUserController = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign(
            { _id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 30*24*60*60*1000,
        });

        return res.redirect("/home")

    } catch (err) {
        console.error("Login Error:", err);
        res.status(502).json({ message: "Bad Gateway 502", error: err.message });
    }
}; 
module.exports.postController = async (req,res) => {
    res.render("post")
}
module.exports.createPostController = async (req,res) => {
    try{

        const {img , cap } = req.body
        const newPost = await postModel.create({
            img, 
            cap
        })
        if(!newPost){
            return res.status(403).json({
                message: "somthing went Wrong"
            })
        }
        res.redirect("/home")
    }catch{
        return res.status(502).json({
            message:"Bad Gateway"
        })
    }
}
module.exports.logoutUserController = async (req,res) => {
    try{
        res.clearCookie("token")
        res.redirect("/login")
    }catch{
        return res.status(502).json({
            message:"Bad Gateway"
        })
    }
}
