const mongoose = require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/kodr").then(() => {
    console.log("connected to DB")
}).catch(err=>{
    console.log(err)
})

const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    age:Number
})

mongoose.model("user",userSchema)