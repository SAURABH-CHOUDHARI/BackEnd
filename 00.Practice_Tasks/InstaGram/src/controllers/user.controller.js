const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const config = require("../config/config")

module.exports.registerUserController = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username) {
            return res.status(400).json({ message: "username is required" })
        }
        if (!email) {
            return res.status(400).json({ message: "email is required" })
        }
        if (!password) {
            return res.status(400).json({ message: "password is required" })
        }
        const isUserExist = await userModel.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })
        if (isUserExist) {
            return res.status(400).json({ message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        })
        const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email
        },
            config.JWT_SECRET)


        return res.status(201).json({ token, user })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}
module.exports.loginUserController = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email) {
            return res.status(400).json({ message: "email is required" })
        }
        if (!password) {
            return res.status(400).json({ message: "password is required" })
        }

        const isUserExist = await userModel.findOne({ email })

        if (!isUserExist) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const isMatch = await bcrypt.compare(password, isUserExist.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({
            id: isUserExist._id,
            username: isUserExist.username,
            email: isUserExist.email,
        }, config.JWT_SECRET)

        return res.status(200).json({ token, isUserExist })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}
module.exports.profileController = (req, res) => {
    res.send(req.user)
}
