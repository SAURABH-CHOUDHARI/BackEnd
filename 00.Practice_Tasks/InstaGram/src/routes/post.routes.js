const {Router} = require("express")
const router = Router()
const userMiddleware = require("../middlewares/user.middleware")
const postController = require("../controllers/post.controller")

router.post("/create", userMiddleware.authUser, postController.createPostController )

module.exports = router