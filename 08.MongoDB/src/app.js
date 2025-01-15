const express = require('express');
const indexRoutes = require("./routes/index.routes")
const userRouter = require('./routes/users.routes');
const app = express();


app.use('/', indexRoutes);
app.use('/users', userRouter);

module.exports = app;