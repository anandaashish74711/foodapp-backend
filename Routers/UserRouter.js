const express = require('express');
const userRouter = express.Router();
const cookieParser = require('cookie-parser')

const {
    getUser,
    postUser,
    updateUser,
    deleteUser,
    getAllUser,
    setCookies,
    getCookies
} = require('../controller/UserController');
const app = express();
app.use(cookieParser());
const protectRoute = require('./authHelper');

//user ke options
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)


//admin specific function
app.use(isAuthorised(['admin']))
userRouter
.route('')
.get(getAllUser)


//profile page
app.use(protectRoute)
userRouter
.route('/userProfile')
.get(getUser)
     
     

 module.exports=userRouter;