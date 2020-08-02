//Custum error response file
const ErrorResponse = require('../utils/errorResponse');

//AsyncHandler for removing trycatch block here means DRY(do not repeat your self)
const asyncHandler = require('../middleware/async');

//Model File
const User = require('../models/User');

//gravatar file to show user image if exists on gravatar
const gravatar = require('gravatar');

//@desc     Register user
//route     POST /api/v1/auth/register
//access    Private
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  //Get users gravatar
  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm',
  });

  //Create user
  const user = await User.create({
    name,
    email,
    avatar,
    password,
  });

  sendTokenResponse(user, 201, res);
});

//@desc     Get current loged in user
//route     POST /api/v1/auth/getme
//access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
});

//@desc     Get token from model, create cookie and send response
//access    Anywhere in this file
//type      Helper Function
const sendTokenResponse = (user, statusCode, res) => {
  //Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  //Set cookie option secure.
  if (process.env.NODE_END === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token });
};
