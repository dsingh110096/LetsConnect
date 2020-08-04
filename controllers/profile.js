const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Profile = require('../models/Profile');
const User = require('../models/User');

//@desc     Get all profiles
//route     GET /api/v1/profile
//access    Public
exports.getAllUserProfiles = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.find().populate({
    path: 'user',
    select: 'name avatar',
  });

  res
    .status(200)
    .json({ success: true, count: profiles.length, data: profiles });
});

//@desc     Get profile by user id
//route     GET /api/v1/profile/user/:user_id
//access    Public
exports.getProfileByUserId = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.params.user_id }).populate({
    path: 'user',
    select: 'name avatar',
  });

  //Check if profile exists
  if (!profile) {
    return next(
      new ErrorResponse(
        `No profile found associated with User ${req.params.user_id}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: profile });
});

//@desc     Get current loged in user profile
//route     GET /api/v1/profile/me
//access    Private
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id }).populate({
    path: 'user',
    select: 'name avatar',
  });
  //Check if profile exists for the user
  if (!profile) {
    return next(new ErrorResponse('No profile exists for this user', 404));
  }

  res.status(200).json({ success: true, data: profile });
});

//@desc     Create user profile
//route     POST /api/v1/profile
//access    Private
exports.createUserProfile = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  req.body.skills = req.body.skills.split(',').map((skill) => skill.trim());
  const profile = await Profile.create(req.body);
  res.status(201).json({ success: true, data: profile });
});

//@desc     Update user profile
//route     PUT /api/v1/profile/:profile_id
//access    Private
exports.updateUserProfile = asyncHandler(async (req, res, next) => {
  if (req.body.skills) {
    req.body.skills.split(',').map((skill) => skill.trim());
  }
  let profile = await Profile.findById(req.params.profile_id);

  //check if profile exists
  if (!profile) {
    return next(
      new ErrorResponse(`Profile with id ${req.params.id} not found`, 404)
    );
  }

  //Make sure user own's the proile
  if (profile.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update profile ${profile._id}`,
        401
      )
    );
  }

  profile = await Profile.findByIdAndUpdate(req.params.profile_id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: profile });
});
