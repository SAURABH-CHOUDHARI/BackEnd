const mongoose = require('mongoose')
const config =require('../config/config')

const connectDB = () => {
    mongoose.connect(config.MONGO_URL)
    .then(()=> {console.log("Db Connected");})
    .catch(err => {console.log(err);})
}

module.exports = connectDB