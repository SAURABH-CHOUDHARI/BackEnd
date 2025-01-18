const mongoose = require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/kodr").then(() => {
    console.log("connected to DB")
}).catch(err=>{
    console.log(err)
})

const driverSchema = new mongoose.Schema({
    driverName: {
        type: String,
    },
    email: {
        type:String, 
    },
    password:{
        type:String,
    }
})

const driverModel = mongoose.model("driver",driverSchema)

module.exports = driverModel