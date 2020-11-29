const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const todoApi = require('./routes');

const app = express();

app.disable('x-powered-by');
require('dotenv').config();

mongoose.connect(process.env.MONGOLAB_URI);

mongoose.connection.on('error', () => {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

const logger = (req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger);
app.use('/api', todoApi);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT || 3000}`);
});

module.exports = app;
