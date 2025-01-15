const express = require("express");
const userController = require("../controllers/user.controller")
const  userRouter  = express.Router();


userRouter.get("/", userController.Users);
userRouter.get("/profile", userController.getProfileController);


module.exports = userRouter;