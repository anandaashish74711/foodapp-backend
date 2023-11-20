const express = require("express");
const userModel = require('../Models/UserModel');
const authRouter = express.Router();
const jwt=require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const JWT_KEY='GHFVQERGFLEJCBFVEWJHCEDCNQEVUV'
const {sendMail}=require('../utility/nodemailer')

module.exports.postsignup = async (req, res) => {
    try {
        let dataobj = req.body;
        let user = await userModel.create(dataobj);
        sendMail("signup",user);
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

module.exports.forgetpassword = async function forgetpassword(req, res) {
    let { email } = req.body;
    try {
      const user = await userModel.findOne({ email: email });
      if (user) {
        //createResetToken is used to create a new token
        const resetToken = user.createResetToken();
        // http://abc.com/resetpassword/resetToken
        let resetPasswordLink = `${req.protocol}://${req.get(
          "host"
        )}/resetpassword/${resetToken}`;
        //send email to the user
        //nodemailer
        let obj={
          resetPasswordLink:resetPasswordLink,
          email:email
        }
        sendMail("resetpassword",obj);
        return res.json({
          mesage: "reset password link sent",
          data:resetPasswordLink
        });
      } else {
        return res.json({
          mesage: "please signup",
        });
      }
    } catch (err) {
      res.status(500).json({
        mesage: err.message,
      });
    }
  };

module.exports.resetpassword = async function resetpassword(req, res) {
    try {
      const token = req.parmas.token;
      let { password, confirmPassword } = req.body;
      const user = await userModel.findOne({ resetToken: token });
  
      if (user) {
        //resetPasswordHandler will update user's password in db
        user.resetPasswordHandler(password, confirmPassword);
        await user.save();
        res.json({
          message: "password changed succesfully, please login again",
        });
      } else {
        res.json({
          message: "user not found",
        });
      }
    } catch (err) {
      res.json({
        message: err.message,
      });
    }
  };
  module.exports.logout=function logout(req,res){
    res.cookie('login',' ',{maxAge:1});
    res.json({
      message:"user logged out succesfully"
    });
  }