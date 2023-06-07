const express = require('express');
const app = express();
const userRouter = require('./routers/userRouter');

app.use(express.json());

app.use('/api/user',userRouter);

<<<<<<< HEAD
=======

>>>>>>> d3d25404e33ff706b692b20743a1cce8bfbb3143
module.exports = app