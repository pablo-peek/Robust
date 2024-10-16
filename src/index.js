const app = require('./app.js');
require('../src/models/index.js');
require('dotenv').config();

const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});