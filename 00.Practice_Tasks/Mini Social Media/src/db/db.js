require("dotenv").config()
const mongoose = require("mongoose")

const connect = ()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("conneted to DB")
    })
    .catch(err=>{
        console.log(err);
        
    })
}

module.exports = connect