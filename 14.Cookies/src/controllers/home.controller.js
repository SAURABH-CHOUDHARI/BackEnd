const jwt = require("jsonwebtoken")
module.exports.homeController = (req, res) => {
    try{

        const token = req.cookies.token
        if(!token){
            return res.redirect("/login")
        }
        const decoded = jwt.verify(token,process.env.JWT_SECREAT)
        res.render('home',{username:decoded.username})
    }catch{
        return res.redirect("/login")
    }
}