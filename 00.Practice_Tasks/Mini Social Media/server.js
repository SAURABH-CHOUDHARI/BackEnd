const app = require("./src/app")
const connect = require("./src/db/db")


connect();

app.listen(3000 , () => {
    console.log("Server is Running on port 3000")
})