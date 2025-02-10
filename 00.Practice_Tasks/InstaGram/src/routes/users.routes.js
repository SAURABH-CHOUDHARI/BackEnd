const {Router} = require("express")
const router = Router()
const userController = require("../controllers/user.controller")
const userMiddleware = require('../middlewares/user.middleware')


router.post("/register", userController.registerUserController)
router.post("/login", userController.loginUserController)
router.get("/profile", userMiddleware.authUser ,userController.profileController)


module.exports = router