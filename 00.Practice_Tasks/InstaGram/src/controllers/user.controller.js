const userModel = require("../models/user.model")

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

        const isUserExist = userModel.findByEmailOrUsername(email, username)

        if (isUserExist) {
            return res.status(400).json({ message: "User already exists" })
        }
        const hashedPassword = await userModel.hashPassword(password)

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        })
        const token = user.generateToken()

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
        const isMatch = await userModel.comparePassword(password, isUserExist.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = isUserExist.generateToken()

        return res.status(200).json({ token, isUserExist })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}
module.exports.profileController = async (req, res) => {
    const profile = await userModel.findById(req.user._id).populate("posts").select('-password')
    
    res.send(profile)
}
