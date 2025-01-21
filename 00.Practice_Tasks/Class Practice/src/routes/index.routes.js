const {Router} = require('express');
const indexController = require('../controllers/index.controller');
const router = Router();

router.get("/",indexController.formController)
router.post("/register",indexController.registerController)
router.get("/persons",indexController.allPersonController)

module.exports = router;