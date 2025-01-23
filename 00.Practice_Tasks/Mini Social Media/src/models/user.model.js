const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    profilePic: {
        type: String
    },
    bio: {
        type: String
    },
})

userModel = mongoose.model("users",userSchema);
module.exports = userModel;