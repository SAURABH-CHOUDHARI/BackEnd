const {Router} = require("express")
const router = Router();
const {userFormController, createUserController ,homeController,createPostController, postFormController, likeController, deletePostController}  = require("../controllers/index..controller")


router.get("/",userFormController)
router.post("/createUser",createUserController)
router.get("/home", homeController)
router.get("/createPost", postFormController)
router.post("/createPost",createPostController)
router.post("/incLike",likeController)
router.post('/deletePost', deletePostController);

module.exports = router;