const connectDB = require("./src/db/db")
const app = require("./src/app")


connectDB() // connect to the database

app.listen(3000, () => {
    console.log("server is running on port 3000");
})