const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken')

module.exports.profileController = async (req,res)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(!token){
        res.send("Please Provide a Token")
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY)
    
    const user = await userModel.findOne({email:decoded.email})
    res.send(user)
    
    
}