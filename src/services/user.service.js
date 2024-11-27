const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { formatTime } = require('../utils/formatTime');
require('dotenv').config();

class UserService {
  constructor() {}

  async putFastLapInRace(userId, raceNumber, lapTime) {
    try {
      const user = await User.findById(userId);
      console.log(user);
      if (!user) {
        throw new Error("User not found");
      }
  
      const race = user.races.find(r => r.raceNumber === raceNumber);
      if (race) {
        if (lapTime < race.bestTime) {
          race.bestTime = lapTime;
        }
      } else {
        user.races.push({ raceNumber, bestTime: lapTime });
      }
  
      await user.save();
      return user.races;
    } catch (error) {
      throw error;
    }
  }

    async getAllUsers(userId, page = 1, limit = 10) {
        try {
            const users = await User.aggregate([
                { $match: { races: { $exists: true, $not: { $size: 0 } } } },
                { $unwind: "$races" },
                { $sort: { "races.bestTime": 1 } },
                { $group: {
                    _id: "$_id",
                    username: { $first: "$username" },
                    races: { $push: "$races" }
                }},
                { $skip: (page - 1) * limit },
                { $limit: limit }
            ]);
    
            const usersWithCurrentUserFlag = users.map(user => ({
                ...user,
                isCurrentUser: user._id.toString() === userId,
                races: user.races.map(({ _id, ...race }) => ({
                    ...race,
                    formattedBestTime: formatTime(race.bestTime)
                }))
            }));
    
            return usersWithCurrentUserFlag;
        } catch (error) {
        throw error;
        }
    }
  
}

module.exports = UserService;
