const mongoose = require('mongoose')

const connect = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(()=> {console.log("Db is Connected");})
    .catch(err => {console.log(err);})
}

module.exports = connect