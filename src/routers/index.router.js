const express = require('express');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');

const indexRouter = express.Router();

indexRouter.use('/auth', authRouter);

indexRouter.use('/user', userRouter);


module.exports = indexRouter;