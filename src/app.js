const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/index.js');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * health validation
 */
app.get('/health', (req, res) => {
  return res.sendStatus(200);
});

app.get('/', (req, res) => {
  const htmlResponse = `
  <html>
    <head>
      <title>Api</title>
    </head>
    <body>
        <h1>API</h1>
      <p>Welcome to the API</p>
    </body>
  </html>
`;
  res.send(htmlResponse);
});

/**
 * Routers
 */
app.use('/api', router);

/**
 * Middleware para manejar errores de JSON
 */
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      status: 400,
      error: 'The format of the JSON is invalid'
    });
  }
  next();
});

app.use((error, req, res, next) => {
  const status = error.status;
  res.status(status).json({
    status,
    ...(error?.message && { errorData: error?.message })
  });
});

app.use((req, res, next) => {
  res.status(404).json({ status: 404, errorData: 'Not Found' });
});

module.exports = app;
