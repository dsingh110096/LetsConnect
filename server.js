const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

//middleware file
const errorHandler = require('./middleware/error');

//Loading env variables
dotenv.config({ path: './config/config.env' });

//Connection to mongoDB
connectDB();

//Route files
const users = require('./routes/users');
const auth = require('./routes/auth');
const posts = require('./routes/posts');
const profile = require('./routes/profile');

const app = express();

//Body Parser to access (req.body)
app.use(express.json());

//Cookie parser

//Dev logging middleware(morgan)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//File upload

//Mongo Sanitize Data

//Adding Security headers

//Prevent xss attacts

//Prevent http param polution

//Set static folder

//Mount Routes
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);
app.use('/api/v1/posts', posts);
app.use('/api/v1/profile', profile);

//Mount middleware
app.use(errorHandler);

//accessing env variable using process.env
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.clear();
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .brightWhite.bold.underline
  );
});

//handling unhandled promise rejection for mongoDB
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err}`.bgWhite.brightRed.bold.underline);
  //close server & exit process
  server.close(() => process.exit(1));
});
