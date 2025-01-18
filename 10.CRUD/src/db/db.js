const mongoose = require("mongoose");

const connect = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/kodr").then(() => {
        console.log("connected to DB")
    }).catch(err=>{
        console.log(err)
    })
}

module.exports = connect;    