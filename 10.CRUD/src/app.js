const express = require("express");
const indexRouter = require("./routes/index.routes")

const app = express();

app.set("view engine","ejs")
app.set("views","./src/views")


app.use("/", indexRouter)

module.exports= app;