//Model File
const User = require('../models/User');

//@desc     Register user
//route     POST /api/v1/auth/register
//access    Private
exports.register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({ success: true, data: user });
  } catch (err) {
    // res.status(400).json({ success: false, data: {} });
    next(err);
  }
};
