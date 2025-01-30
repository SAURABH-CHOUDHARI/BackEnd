const {Router} = require('express')
const router = Router()
const userController = require("../controllers/user.controller")

router.get("/",userController.profileController)




module.exports = router