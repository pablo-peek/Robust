
const mongoose = require('mongoose');
require('dotenv').config();


let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return;
    }
    try {
        await mongoose.connect(process.env.ROBUST_MONGODB_URI);
        isConnected = true;
        console.log('Database connected');
    } catch (error) {
        console.error('Error:', error);
    }
};

module.exports = connectDB;
