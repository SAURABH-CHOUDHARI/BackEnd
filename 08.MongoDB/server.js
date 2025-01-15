const app = require('./src/app')
require("./src/db/db");


app.listen(3000, () => {
    console.log("server is running on port 3000");
})