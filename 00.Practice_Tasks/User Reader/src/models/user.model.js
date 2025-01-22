const mongoose = require("mongoose")


userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    }, 
    bio: {
        type: String
    }, 
    image: {
        type: String
    },
})

const userModel = mongoose.model("Users",userSchema);
module.exports = userModel;