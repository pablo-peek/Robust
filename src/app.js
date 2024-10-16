const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/index.js');
const User = require('./models/users');
const jwt = require('jsonwebtoken');
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

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('No user found');
  }
  const validPassword = await user.validatePassword(password);
  if (!validPassword) {
    throw new Error('Invalid password');
  }
  const token = jwt.sign({ id: user._id }, 'MySecretDomentos', {
    expiresIn: 60 * 60 * 2
  });

  return res.json({ auth: true, token, username: user.username });

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
