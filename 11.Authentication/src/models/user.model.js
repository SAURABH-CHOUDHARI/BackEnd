const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    profilePic: {
        type: String
    },
    email: {
        type: String
    },
    bio: {
        type: String
    },
    password: {
        type: String
    }
})

userModel = mongoose.model("users",userSchema);
module.exports = userModel;