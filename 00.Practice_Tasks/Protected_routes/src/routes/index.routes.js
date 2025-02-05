const {Router} = require('express')
const router = Router()
const indexController = require('../controllers/index.controller')
const authMiddleware = require('../middlewares/authMiddleware')


router.get('/',indexController.registerController)
router.get('/login',indexController.loginController)
router.get('/createPost', authMiddleware ,indexController.postController)
router.post('/createPost', authMiddleware ,indexController.createPostController)
router.post('/login',indexController.loginUserController)
router.post('/register',indexController.registerUserController)
router.post('/logout',indexController.logoutUserController)

module.exports = router