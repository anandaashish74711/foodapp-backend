const express=require("express");

const authRouter = express.Router();
const path = require('path');
const userModel = require(path.join(__dirname, './Models/UserModel'));
authRouter
    .route('/signup')
    .post(postsignup)
    .get(getsignup);

authRouter
  .route('/login')
  .post(loginuser)

function getsignup(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, 'public') });
}

async function postsignup(req, res) {
    let dataobj = req.body;
    let user=await userModel.create(dataobj)
    res.json({
        message: "user signed up",
        data: user
    })
}

function loginuser(req,res){

}
module.exports=authRouter;