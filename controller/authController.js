const express = require("express");
const userModel = require('../Models/UserModel');
const authRouter = express.Router();
const jwt=require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const JWT_KEY='GHFVQERGFLEJCBFVEWJHCEDCNQEVUV'


module.exports.postsignup = async (req, res) => {
    try {
        let dataobj = req.body;
        let user = await userModel.create(dataobj);
        if(user){
            res.json({
                message: "user signed up",
                data: user
            });
        } else {
            res.json({
                message: "error while signing up"
            });
        }
    } catch (error) {
        res.json({
            message: "Error occurred during signup",
            error: error.message
        });
    }
}



module.exports.loginuser = async function(req,res){
    let data = req.body;
    let user = await userModel.findOne({email: data.email});
    if(user){
        if(user.password == data.password){
            let payload=user['_id']; //uuid
            let token = jwt.sign({payload:user['_id']},JWT_KEY)

            res.cookie('login', token, {httpOnly: true});
            return res.json({
                message: 'User logged in',
                userDetails: data
            });
        } else {
            return res.json({
                message: 'Wrong credentials'
            });
        }
    } else {
        return res.json({
            message: 'User not found. Please sign up.'
        });
    }
}

//isAuthorise->to check the user role
module.exports.isAuthorised = function (roles){
    return function(req,res,next){
        if(roles.includes(req.role)){
            next();
        }
        else{
            res.status(401).json({
                message:'unauthorised access'
            });
        }
    }
}

//protectRoute
 // replace with your user model path

module.exports.protectRoute=async function(req, res, next) {
    let token;
    if (req.cookies.login) {
        token = req.cookies.login;
        try {
            let payload = jwt.verify(token, JWT_KEY);
            const user = await userModel.findById(payload.id);
            if (!user) {
                return res.status(401).json({
                    message: 'User not found'
                });
            }
            req.role = user.role;
            req.id = user.id;
            next();
        } catch (err) {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }
    } else {
        return res.status(401).json({
            message: 'Operation not allowed'
        });
    }
}

    
