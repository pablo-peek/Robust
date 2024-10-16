const express = require('express');
const controllerHandler = require('../middlewares/controller-handler');
const AuthController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.route('/login').post(controllerHandler(AuthController.login));

authRouter.route('/register').post(controllerHandler(AuthController.register));


module.exports = authRouter;