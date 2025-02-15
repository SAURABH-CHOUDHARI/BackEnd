const express = require("express")
const app = express()
const cors = require('cors')
const userRoutes = require("./routes/users.routes")
const postRoutes = require("./routes/post.routes")
const indexRoutes = require("./routes/index.routes")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/users",userRoutes)
app.use("/posts",postRoutes)
app.use("/",indexRoutes)




module.exports = app