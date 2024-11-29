const jwt = require('jsonwebtoken');
const User = require('../models/users');
const formatTime = require('../utils/formatTime');
require('dotenv').config();

class UserService {
  constructor() {}

    async getAllUsers(userId, raceNumber, page, limit) {
        try {
            const users = await User.aggregate([
                { $match: { races: { $exists: true, $not: { $size: 0 } } } },
                { $sort: { "races.bestTime": 1 } },
                { $skip: (page - 1) * limit },
                { $limit: limit },
                { $project: {
                    _id: 1,
                    username: 1,
                    races: { $arrayElemAt: ["$races", raceNumber - 1] }
                }}
            ]);
    
            const filteredUsers = users.filter(user => user.races && user.races.bestTime !== undefined);
    
            const usersWithCurrentUserFlag = filteredUsers.map(user => {
                const race = user.races;
                return {
                    ...user,
                    isCurrentUser: user._id.toString() === userId,
                    races: race ? [{
                        ...race,
                        formattedBestTime: formatTime(race.bestTime)
                    }] : []
                };
            });
    
            return usersWithCurrentUserFlag;
        } catch (error) {
            throw error;
        }
    }

    async getUserProfile(userId) {
        try {
            const user = await User.findById(userId);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async updateUserProfile(userId, avatar, variant) {
        try {
            const user = await User.findByIdAndUpdate
            (userId, { avatar, variant }, { new: true });

            if(!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;
