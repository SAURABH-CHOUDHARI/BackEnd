const bcrypt = require('bcrypt')
const userModel = require("../models/userModel")
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
            process.env.JWT_SECREAT
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

        const { username, password } = req.body

        const user = await userModel.findOne({ username:username })
        if (!user) {
            return res.send("user")
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.send("password")
        }
        const token = jwt.sign({
            _id: user._id,
            username: user.username

        },
            process.env.JWT_SECREAT
        )
        res.cookie('token', token)
        res.redirect("/home")



    } catch (err) {
        res.status(502).json({ message: "Bad Gateway 502", error: err.message })
    }
}  