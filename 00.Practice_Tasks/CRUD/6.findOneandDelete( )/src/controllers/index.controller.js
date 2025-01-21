const userModel =require("../models/user.model");

module.exports.indexController = async (req,res) => {
    const {name, email} = req.body;
    const newUser = new userModel({
        name:name,
        email:email,
    });
    await newUser.save();
    res.send(newUser);
}
module.exports.usersController = async (req,res) => {
    const users = await userModel.find({});
    res.send(users);
}
module.exports.findUserController = async (req,res) => {
    const {name} = req.body
    const user = await userModel.findOne({name:name});
    res.send(user);
}
module.exports.updateUserController = async (req, res) => {
    try {
        const { name, updateEmail } = req.body;

        if (!name || !updateEmail) {
            return res.status(400).json({
                success: false,
                message: 'Name and email are required fields'
            });
        }

        const updatedUser = await userModel.findOneAndUpdate(
            { name: name },
            { email: updateEmail },
            { new: true } 
        );

        if(!updatedUser) {
            return res.status(400).json({
                success: false,
                message: 'User Not Found'
            });
        }

        res.send(updatedUser)

    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};
module.exports.deleteUserController = async (req,res) => {
    
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Name is required'
            });
        }
        

        const deletedUser = await userModel.findOneAndDelete({name:name});
        if(!deletedUser){
            return res.status(400).json({
                success: false,
                message: 'Name Does not Exist'
            });
        }
        res.redirect("/users");
    

    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}