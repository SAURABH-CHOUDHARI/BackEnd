const personModel = require("../models/person.model")

module.exports.formController = (req, res) => {
    res.render("form");
};
module.exports.registerController = async (req, res) => {
    const { username, email, bio, image } = req.body;
    await personModel.create({
        username: username,
        email: email,
        bio: bio,
        image: image,
    })
    res.redirect("./persons");
};
module.exports.allPersonController = async (req, res) => {
    const allPerson = await personModel.find({});

    res.render("persons", { allPerson });
};
