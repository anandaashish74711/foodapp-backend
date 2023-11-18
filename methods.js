const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const userRouter = require('./Routers/UserRouter');



app.use('/user', userRouter);

console.log('Express app initialized');

app.listen(3000);
console.log('Server started on port 3000');
