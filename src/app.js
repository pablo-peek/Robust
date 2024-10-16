const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/index.js');

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * health validation
 */
app.get('/health', (req, res) => {
  return res.sendStatus(200);
});

/** 
 * Routers
*/
app.use('/api', router);

app.use((error, req, res, next) => {
  const status = error.status;
  res.status(status).json({ 
    status, 
    ...(error?.message && {errorData: error?.message}) 
  });
});

app.use((req, res, next) => {
  res.status(404).json({status: 404, errorData: 'Not Found' });
});

module.exports = app;