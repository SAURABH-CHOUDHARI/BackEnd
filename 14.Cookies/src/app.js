const express = require("express");
const app= express();
const indexRoute = require('./routes/index.routes');
const homeRoute = require('./routes/home.routes');
const cookieParser = require("cookie-parser");

app.set('view engine','ejs')
app.set('views','./src/views')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/home",homeRoute)
app.use("/",indexRoute)




module.exports = app;