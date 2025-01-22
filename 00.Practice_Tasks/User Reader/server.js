const app = require("./src/app");
const conncect = require("./src/db/db");

conncect();

app.listen(3000,()=>{
    console.log("Server is Runnig on port 3000 ")
})
