const express = require('express');
const userRouter = express.Router();

const { postsignup, loginuser, isAuthorised, protectRoute } = require('../controller/authController');
const {
    getUser,
    updateUser,
    deleteUser,
    getAllUser,
} = require('../controller/UserController');

// User options
userRouter.route('/:id')
    .patch(updateUser)
    .delete(deleteUser);

userRouter.route('/signup').post(postsignup);
userRouter.route('/login').post(loginuser);

// Admin specific function
userRouter.route('')
    .all(isAuthorised(['admin'])) // Apply the isAuthorised middleware to all requests to this route
    .get(getAllUser);

// Profile page
userRouter.route('/userProfile')
    .all(protectRoute) // Apply the protectRoute middleware to all requests to this route
    .get(getUser);

module.exports = userRouter;
