const userModel = require("../Models/UserModel");

module.exports.getUser = async function(req, res) {
    let id = req.params.id;
    let user = await userModel.findById(id);
    if(user){
        res.json({user});
    } else {
        res.json({message:'user not found'});
    }
};

module.exports.updateUser = async function(req, res) {
    try {
        let id = req.params.id;
        let dataTOBeupdated = req.body;
        let user = await userModel.findByIdAndUpdate(id, dataTOBeupdated, { new: true });
        res.json({
            message: "data updated successfully",
            data: user
        });
    } catch(err) {
        res.json({
            message: err.message
        });
    }
};

module.exports.deleteUser = async function(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if(!user){
            res.json({message:'user not found'});
        } else {
            res.json({
                message:"data has been deleted",
                data:user
            });
        }
    } catch(err) {
        res.json({
            message: err.message
        });
    }
};

module.exports.getAllUser = async function(req, res) {
    try {
        let users = await userModel.find();
        if(users){
            res.json({
                message:'users retrieved',
                data:users
            });
        } else {
            res.json({
                message:'not found'
            });
        }
    } catch(err) {
        res.json({
            message: err.message
        });
    }
};

module.exports.setCookies = function(req,res){
    res.setHeader('Set-Cookies','isLoggedIn=true');
    res.cookie('isLoggedIn',true,{maxAge:1000*60*24,secure:true},{httpOnly:true});
    res.send('COOKIES has been set');
};
