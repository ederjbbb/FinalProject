const path = require('path'); 
const express = require('express');
const app = express();
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const HttpStatus = require('http-status-codes');
const port = process.env.PORT || '3001';
const { isDev } = require('./constants/environment');
const routes = require('./routes');
const { errorHandler } = require('./midlewares');

if (!isDev)
  require('dotenv').config({ path: path.join(__dirname, '.env') });

// Middlewares
app.use(morgan(isDev ? 'dev' : 'tiny'));
app.use(cookieParser());
app.use(express.json());
app.use('/', routes); // API
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Yummy backend listening at http://localhost:${port}`)
);
