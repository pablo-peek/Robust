const { to } = require('await-to-js');
const CustomError = require('../utils/customError.js');
const UserService = require('../services/user.service.js');
const {validatePutFastLapInRace} = require('../utils/validateSchemaJoi.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    putFastLapInRace = async (httpRequest) => {
        const { body } = httpRequest;
        const { authorization } = httpRequest.headers;

        let userId;

        if(!authorization){
            throw new CustomError({
                message: 'Missing required data'
            });
        }

        try {
            const decoded = jwt.verify(authorization, process.env.KEY_SECRET);
            userId = decoded.id;
        } catch (error) {
            return {
                status: 401,
                message: 'Failed to authenticate token'
            }
        }

        const { raceId, lapTime } = httpRequest.body;

        const { error } = validatePutFastLapInRace(body);

        if (error) {
            throw new CustomError({
              message: error.details[0].message
            });
          }


        const [err, result] = await to(this.userService.putFastLapInRace(userId, raceId, lapTime));

        if (err) {
            throw new CustomError({
                message: err.message
            });
        }

        if (!result) {
            throw new CustomError({
                message: 'User not found'
            });
        }

        return {
            status: 200,
            data: result
        };
    }

    getAllUsers = async (httpRequest) => {
        const { authorization } = httpRequest.headers;
        let { page, limit } = httpRequest.query;

        let userId;

        if(!authorization){
            throw new CustomError({
                message: 'Missing required data'
            });
        }

        try {
            const decoded = jwt.verify(authorization, process.env.KEY_SECRET);
            userId = decoded.id;
        } catch (error) {
            return {
                status: 401,
                message: 'Failed to authenticate token'
            }
        }

        page = parseInt(page, 10);
        limit = parseInt(limit, 10);

        const [err, result] = await to(this.userService.getAllUsers(userId, page, limit));

        if (err) {
            throw new CustomError({
                message: err.message
            });
        }

        if (!result) {
            throw new CustomError({
                message: 'User not found'
            });
        }

        return {
            status: 200,
            data: result
        };

    }

}


const authController = new UserController();

module.exports = authController;