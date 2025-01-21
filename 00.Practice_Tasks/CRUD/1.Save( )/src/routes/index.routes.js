const express = require("express");
const indexController = require("../controllers/index.controller")
const indexRouter = express.Router();

indexRouter.get("/",indexController.indexController);

module.exports = indexRouter;