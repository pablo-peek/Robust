const mongoose = require('mongoose');
require('dotenv').config();

const {ROBUST_MONGODB_URI} = process.env;

mongoose.connect(ROBUST_MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });