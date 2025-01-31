const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports.registerController = async (req, res) => {
    try {

        const { username, email, password } = req.body

        const hashpass = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({
            username,
            email,
            password: hashpass,
        })
        if (!newUser) {
            return res.status(400).json({ messege: "failed to Register" })
        }
        res.status(201).json({ username: newUser.username, messege: "New User Created Successfully" })
    } catch {
        res.status(500).json({ messege: "Internal Server Error" })
    }
}
module.exports.loginController = async (req, res) => {
    try{
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) { return res.status(400).json({ messege: "Invalid email or password" }) }
        const isMatch = bcrypt.compare(password, user.password)
        if (!isMatch) {return res.status(201).json({ messege: "Invalid email or password" }) }
        const token = jwt.sign({id:user._id},process.env.JWT_KEY)
        if(!token) { return res.status(500).json({ messege: "Internal Server Error" })}
        res.status(200).json({token,messege:"Login Successful"})
    }catch{
        res.status(500).json({ messege: "Internal Server Error" })
    }
}
module.exports.profileController = async (req, res) => {
    try{
        const token = req.headers.authorization?.split(" ")[1]
        if(!token){return res.status(500).json({ messege: "Internal Server Error" })}
        const payload = jwt.verify(token,process.env.JWT_KEY)
        const user = await userModel.findOne({_id:payload.id})
        if(!user){return res.status(500).json({ messege: "Internal Server Error" })}
        res.status(200).json({user,messege:"successful"})
    }catch{
        res.status(500).json({ messege: "Internal Server Error" })
    }


}
//midllewares BUilt-in custom ThirdParty
//app level middlewarre routeslevel middleware
//error handling middleware