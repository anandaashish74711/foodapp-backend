const express = require('express');
const app = express();
const path = require('path');
const userModel=require('./Models/UserModel')
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

console.log('Express app initialized');
app.listen(3000);
console.log('Server started on port 3000');

// let users = [
//     {
//         'id': 1,
//         'name': "Abhishek"
//     },
//     {
//         'id': 2,
//         'name': "Aashish"
//     },
//     {
//         'id': 3,
//         'name': "Dhiraj"
//     },
//     {
//         'id': 4,
//         'name': "Kartik"
//     }
// ];

const userRouter = express.Router();
const authRouter = express.Router();
app.use('/user', userRouter);
app.use('/auth', authRouter);

userRouter
    .route('/')
    .get(getUsers)
    .post(postUser)
    .patch(patchUser)
    .delete(deleteUser);

userRouter
    .route('/:id')
    .get(getUserbyId);

   
    userRouter
     .route('/getCookies')
     .get(getCookies); 

     userRouter
     .route('/setCookies')
     .get(setCookies); 

authRouter
    .route('/signup')
    .post(postsignup)
    .get(getsignup);

async function getUsers(req, res) {
  let user = await userModel.findOne({ name: 'Ayush' });

res.json({message:'list of all users',
data:user})
    // res.send(users);
};

function postUser(req, res) {
    console.log(req.body);
    if (Array.isArray(req.body)) {
        users = users.concat(req.body);
    } else {
        users.push(req.body);
    }
    res.json({
        message: "data received successfully",
        user: req.body
    });
};

async function patchUser(req, res) {
    console.log('req.body->', req.body);
    const update = req.body;
    const userToUpdate = await userModel.findOne({ email: update.email });
    if (userToUpdate) {
        userToUpdate.name = update.name;
        await userToUpdate.save();
    }
    res.json({
        message: "data updated successfully"
    });
};





async function deleteUser(req, res) {
   let dataToBeDeleted=req.body;
   let user=await userModel.findOneAndDelete(dataToBeDeleted);
   res.json({
    message:"data has been deleted",
    data:user
   })
};



function getUserbyId(req, res) {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);

    if (user) {
        res.send(user);
    } else {
        res.status(404).send('User not found');
    }
};

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

function setCookies(req,res){
res.setHeader('Set-Cookies','isLoggedIn=true');
res.cookie('isLoggedIn',true);
res.send('COOKIES has been set');
}
function getCookies(req, res) {
    res.send(req.headers.cookie);
}
