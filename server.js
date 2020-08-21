const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const colors = require('colors');
const connectDB = require('./config/db');

//middleware file
const errorHandler = require('./middleware/error');

//Loading env variables
dotenv.config({ path: './config/config.env' });

//Connection to mongoDB
connectDB();

//Route files
const auth = require('./routes/auth');
const posts = require('./routes/posts');
const profile = require('./routes/profile');

const app = express();

//Body Parser to access (req.body)
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Dev logging middleware(morgan)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Mongo Sanitize Data
app.use(mongoSanitize());

//Adding Security headers
app.use(helmet());

//Prevent xss attacts
app.use(xss());

//Prevent http param polution
app.use(hpp());

//Mount Routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/posts', posts);
app.use('/api/v1/profile', profile);

//Mount middleware
app.use(errorHandler);

//Serve static assests in production
if (process.env.NODE_ENV === 'production') {
  //Set Static Folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
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
