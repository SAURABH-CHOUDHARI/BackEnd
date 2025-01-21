const express = require("express");
const indexController = require("../controllers/index.controller")
const indexRouter = express.Router();

indexRouter.get("/",indexController.indexController);
indexRouter.get("/users",indexController.usersController);
indexRouter.get("/user",indexController.findUserController);

module.exports = indexRouter;