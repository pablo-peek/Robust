const express = require('express');
const controllerHandler = require('../middlewares/controller-handler');
const AuthController = require('../controllers/authController');
const verifyToken = require('../controllers/verifyToken');

const authRouter = express.Router();

authRouter.route('/login').post(controllerHandler(AuthController.login));

authRouter.route('/register').post(controllerHandler(AuthController.register));

authRouter.route('/validate-token').post(verifyToken);


module.exports = authRouter;