const express = require('express');
const controller = require("./controllers/index.controller");
const userController = require("./controllers/user.controller");
const app = express();



app.get('/', controller.indexController);
app.get('/about', controller.aboutController);
app.get('/users/profile', userController.getProfileController);


module.exports = app;