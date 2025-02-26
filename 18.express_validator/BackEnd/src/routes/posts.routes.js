const {Router} = require('express');
const router = Router();

const userMiddleware = require("../middlewares/user.middleware")
const postControllers = require("../controllers/Post.controller")
const postMiddleware = require("../middlewares/post.middleware")

router.post('/create', userMiddleware.authUser, postMiddleware.handelFileUpload ,postControllers.createPostController)

module.exports = router;