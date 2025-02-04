const {Router} = require("express")
const router = Router()
const homeController = require("../controllers/home.controller")
const authMiddleware = require('../middlewares/authMiddleware')

router.get("/", authMiddleware ,homeController.homeController)

module.exports = router