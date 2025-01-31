const {Router}= require('express')
const router = Router()
const indexController = require("../controllers/index.controller")

router.post('/register',indexController.registerController)
router.post('/login',indexController.loginController)
router.get('/profile',indexController.profileController)


module.exports = router