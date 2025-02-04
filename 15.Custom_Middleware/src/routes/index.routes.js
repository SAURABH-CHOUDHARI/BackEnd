const {Router} = require('express')
const router = Router()
const indexController = require('../controllers/index.controller')


router.get('/',indexController.registerController)
router.get('/login',indexController.loginController)
router.post('/login',indexController.loginUserController)
router.post('/register',indexController.registerUserController)

module.exports = router