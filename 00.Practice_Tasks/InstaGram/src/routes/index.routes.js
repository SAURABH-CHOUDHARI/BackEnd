const {Router} = require("express")
const router = Router()
const userMiddleware = require("../middlewares/user.middleware")
const indexController = require("../controllers/index.controller")

router.get("/feed", userMiddleware.authUser, indexController.feedController )

module.exports = router