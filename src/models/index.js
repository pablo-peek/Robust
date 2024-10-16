const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.ROBUST_MONGODB_URI, { connectTimeoutMS: 5000 });
        console.log('Database connected');
    } catch (error) {
        console.error('Error:', error);
    }
};

module.exports = connectDB;