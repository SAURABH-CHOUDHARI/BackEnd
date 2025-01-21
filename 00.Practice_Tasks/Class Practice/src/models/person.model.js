const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    email: {
        type:String,
    },
    bio:{
        type:String,
    },
    image:{
        type: String,
    },
})

const personModel = mongoose.model("person",personSchema);
module.exports = personModel;