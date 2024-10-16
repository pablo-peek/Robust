const { to } = require('await-to-js');
const CustomError = require('../utils/customError.js');
const AuthService = require('../services/authService.js');
const validateRegisterData = require('../utils/validateSchemaJoi.js');

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }
  login = async (httpRequest) => {
    const { body } = httpRequest;
    const { email, password } = body;

    const [err, result] = await to(this.authService.login(email, password));

    if (err) {
      throw new CustomError({
        message: err.message,
        status: 400
      });
    }

    if(!result) {
        throw new CustomError({
            message: 'User not found',
            status: 400
        });
    }

    return {
        status: 200,
        message: 'Login successful',
        data: result
    };
  };

  register = async (httpRequest) => {
    const { body } = httpRequest;
    const { email, password, username } = body;

    const { error } = validateRegisterData(body);

    if (error) {
      throw new CustomError({
        message: error.details[0].message,
        status: 400
      });
    }

    const [err, result] = await to(this.authService.register( email, password, username));

    if (err) {
      throw new CustomError({
        message: err.message,
        status: err.status
      });
    }

    return {
        status: 201,
        message: 'User created successfully',
        data: result
    };
  };
}

const authController = new AuthController();

module.exports = authController;
