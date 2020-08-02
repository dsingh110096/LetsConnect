//Custum error response file
const ErrorResponse = require('../utils/errorResponse');

//AsyncHandler for removing trycatch block here means DRY(do not repeat your self)
const asyncHandler = require('../middleware/async');

//Model File
const User = require('../models/User');

//@desc     Register user
//route     POST /api/v1/auth/register
//access    Private
exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({ success: true, data: user });
});
