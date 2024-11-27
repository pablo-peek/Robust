const jwt = require('jsonwebtoken');
const User = require('../models/users');
require('dotenv').config();

class AuthService {
  constructor() {}

  async login(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('No user found');
      }
      const validPassword = await user.validatePassword(password);
      if (!validPassword) {
        throw new Error('Invalid password');
      }
       const token = jwt.sign({ id: user._id }, process.env.KEY_SECRET, {
        expiresIn: 60 * 60 * 24 * 365
      });

      return { auth: true, token, username: user.username };
    } catch (error) {
      throw error;
    }
  }

  async register(email, password, username) {
    try {
      const existingUser = await User.findOne({
        $or: [{ email }, { username }]
      });
      if (existingUser) {
        throw new Error('Email or username already exists');
      }
      const user = new User({ email, password, username });
      user.password = await user.encryptPassword(password);
      await user.save();
  
      const token = jwt.sign({ id: user._id }, process.env.KEY_SECRET, {});
      return { auth: true, token, username: user.username };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
