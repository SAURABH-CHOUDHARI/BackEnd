const driverModel = require("../db/db")



module.exports.indexController = (req, res) => {
    res.render("index");
};
module.exports.registerController = async (req, res) => {
    const {name,email,password} = req.query
    // const newDriver = new driverModel({
    //     driverName:name,
    //     email: email,
    //     password: password
    // })
    // await newDriver.save()
    const newDriver = await driverModel.create({
        driverName:name,
        email: email,
        password: password
    })
    res.send(newDriver)
};
