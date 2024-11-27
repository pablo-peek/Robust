const express = require('express');
const controllerHandler = require('../middlewares/controller-handler');
const UserController = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.route('/fast-lap-in-race').put(controllerHandler(UserController.putFastLapInRace));

userRouter.route('/all-users-races').get(controllerHandler(UserController.getAllUsers));


module.exports = userRouter;