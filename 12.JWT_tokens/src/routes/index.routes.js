const {Router} = require('express')
const router = Router()
const {indexController,loginUserController,signUpController,createUserController,loginController} = require('../controllers/index.controller')

router.get("/",indexController)
router.get("/loginUser",loginController)
router.post("/loginUser",loginUserController)
router.get("/createUser",signUpController)
router.post("/createUser",createUserController)


module.exports = router