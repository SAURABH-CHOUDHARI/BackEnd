const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is Required"],
        unique: [true, "Username already exists"],
        minlength: [3, 'Username must be atleast 6 characters'],
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: [true, "Email already exists"],
        minlength: [6, 'Email must be atleast 6 characters'],
        maxlength: [64, 'Email must be under 64 characters']
    },
    password: {
        type: String,
    },
})

const userModel = mongoose.model("users", userSchema)
module.exports = userModel