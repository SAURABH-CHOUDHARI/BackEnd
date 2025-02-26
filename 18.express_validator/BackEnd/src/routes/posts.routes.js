const {Router} = require('express');
const router = Router();

const userMiddleware = require("../middlewares/user.middleware")
const postControllers = require("../controllers/post.controller")
const postMiddleware = require("../middlewares/post.middleware")

router.post('/create',  userMiddleware.authUser, postMiddleware.handelFileUpload ,postControllers.createPostController)
router.get('/feed', postMiddleware.apifeedlimit ,userMiddleware.authUser, postControllers.feedController)

module.exports = router;