const express = require("express");
const userModel = require('../Models/UserModel');
const authRouter = express.Router();
const jwt=require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const JWT_KEY='GHFVQERGFLEJCBFVEWJHCEDCNQEVUV'

const app = express();
app.use(cookieParser());

authRouter
    .route('/signup')
    .post(postsignup)
    .get(getsignup);

authRouter
    .route('/login')
    .post(loginuser);

function getsignup(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, 'public') });
}

async function postsignup(req, res) {
    let dataobj = req.body;
    let user = await userModel.create(dataobj);
    res.json({
        message: "user signed up",
        data: user
    });
}

async function loginuser(req,res){
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
            message: 'Wrong credentials'
        });
    }
}

module.exports = authRouter;
