const express = require('express');
const app = express();
const path = require('path');
const mongoose=require('mongoose')
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

console.log('Express app initialized');
app.listen(4000);
console.log('Server started on port 4000');

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
const authRouter = express.Router();
app.use('/user', userRouter);
app.use('/auth', authRouter);

userRouter
    .route('/')
    .get(getUser)
    .post(postUser)
    .patch(patchUser)
    .delete(deleteUser);

userRouter
    .route('/:id')
    .get(getUserbyId);

authRouter
    .route('/signup')
    .post(postsignup)
    .get(getsignup);

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

function postsignup(req, res) {
    let obj = req.body;
    res.json({
        message: "user signed up",
        data: obj
    })
}
const db_link='mongodb+srv://anandaashish512:Z8BEU9EQjUIx5Liv@cluster0.anltsdp.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(function () {
    console.log('db connected');
  })
  .catch(function (err) {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 8
  }
});

const userModel = mongoose.model('userModel', userSchema);

(async function createUser() {
  try {
    let user = {
      name: 'Aashish',
      email: 'anandaashish512@gmail.com',
      password: '12345678',
      confirmPassword: '12345678'
    };
    let user2 = {
      name: 'Aashish',
      email: 'anandahish512@gmail.com',
      password: '1234567',
      confirmPassword: '1234568'
    };

    let data = await userModel.create(user);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
})();