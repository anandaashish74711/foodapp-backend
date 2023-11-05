const express = require('express');
const app = express();
app.use(express.json());
console.log('Express app initialized'); // Add this line
app.listen(3000);
console.log('Server started on port 3000'); // Add this line

let users = [
    {
        'id': 1,
        'name': "Abhishek"
    },
    {
        'id': 2,
        'name': "Aashish"
    },
    {
        'id': 3,
        'name': "Dhiraj"
    },
    {
        'id': 4,
        'name': "Kartik"
    }
];

const userRouter = express.Router();
app.use('/user', userRouter);

userRouter
    .route('/')
    .get(getUser)
    .post(postUser)
    .patch(patchUser)
    .delete(deleteUser);

userRouter
    .route('/:id')
    .get(getUserbyId);

function getUser(req, res) {
    res.send(users);
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

function patchUser(req, res) {
    console.log('req.body->', req.body);
    req.body.forEach(update => {
        const userToUpdate = users.find(user => user.id === update.id);
        if (userToUpdate) {
            userToUpdate.name = update.name;
        }
    });
    res.json({
        message: "data updated successfully"
    });
};

function deleteUser(req, res) {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);
    res.json({
        message: `User with ID ${userId} deleted successfully`
    });
};

function getUserbyId(req, res)  {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send('User not found');
  }
};

