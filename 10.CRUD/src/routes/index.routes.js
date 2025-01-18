const express  = require("express");
const controller = require("../controllers/index.controller")
const  router  = express.Router();


router.get("/", controller.indexController);
router.get("/register", controller.registerController);
router.get("/users", controller.getUsersController);
router.get("/update-user", controller.updateUserController);
router.get("/delete-user", controller.deleteUserController);

module.exports = router;
