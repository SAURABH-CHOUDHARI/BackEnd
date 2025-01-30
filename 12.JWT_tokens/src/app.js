const express =require("express")
const app = express()
const indexRouter = require('./routes/index.routes')
const usersRouter = require('./routes/users.routes')

app.set("view engine","ejs")
app.set("views","./src/views")

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/", indexRouter)
app.use("/users", usersRouter)



module.exports = app;

