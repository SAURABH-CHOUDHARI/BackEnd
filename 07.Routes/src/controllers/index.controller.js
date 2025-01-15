module.exports.indexController = (req, res) => {
    res.send("HEllo World");
};
module.exports.aboutController = (req, res) => {
    res.send({
        msg: "About Object"
    });
};