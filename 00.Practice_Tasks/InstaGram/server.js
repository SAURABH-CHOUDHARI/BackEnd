require("dotenv").config()
const config = require("./src/config/config")
const app = require("./src/app")
const connectDB = require("./src/db/db")


connectDB();

app.listen(config.PORT,() => {
    console.log("server is Running on PORT: ",config.PORT);
    
})