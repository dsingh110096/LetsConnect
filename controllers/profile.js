const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Profile = require('../models/Profile');
const axios = require('axios');
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
  //Check if profile exists
  const profile = await Profile.findOne({ user: req.params.user_id }).populate({
    path: 'user',
    select: 'name avatar',
  });

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
  //Check if profile exists for the user
  const profile = await Profile.findOne({ user: req.user.id }).populate({
    path: 'user',
    select: 'name avatar',
  });

  if (!profile) {
    return next(new ErrorResponse('No profile exists for this user', 404));
  }

  res.status(200).json({ success: true, data: profile });
});

//@desc     Create and Update user profile
//route     POST /api/v1/profile
//access    Private
exports.createAndUpdateUserProfile = asyncHandler(async (req, res, next) => {
  //Build profile object from req.body
  const profileFields = {};
  profileFields.user = req.user.id;

  for (const key in req.body) {
    if (key in req.body) {
      if (key === 'skills') {
        profileFields[key] = req.body.skills
          .split(',')
          .map((skill) => skill.trim());
      } else {
        profileFields[key] = req.body[key];
      }
    }
  }

  // //Build social object from req.body
  profileFields.social = {};
  for (const key in req.body) {
    if (key in req.body) profileFields.social[key] = req.body[key];
  }

  //check if profile exists then update the profile
  let profile = await Profile.findOne({ user: req.user.id });
  if (profile) {
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      profileFields,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  //if profile not exists then create it
  if (!profile) {
    profile = await Profile.create(profileFields);
  }

  res.status(200).json({ success: true, data: profile });
});

//@desc     Add profile experinece
//route     PUT /api/v1/profile/experience
//access    Private
exports.addUserProfileExperience = asyncHandler(async (req, res, next) => {
  //check if profile exists
  let profile = await Profile.findOne({ user: req.user.id });
  if (!profile) {
    return next(
      new ErrorResponse(
        `No profile found associated with User ${req.user.id}`,
        404
      )
    );
  }

  //Build New Experience Object From req.body
  const newExperience = {};
  for (const key in req.body) {
    if (key in req.body) newExperience[key] = req.body[key];
  }

  //Add New Experience to Experiece object
  profile.experience.unshift(newExperience);

  //If 'to' date present then remove current
  if (newExperience.to) profile.experience[0].current = undefined;

  //saving profile to db
  await profile.save();

  res.status(200).json({ success: true, data: profile });
});

//@desc     Update profile experinece
//route     PUT /api/v1/profile/experience/:experience_id
//access    Private
exports.updateUserProfileExperience = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id });

  //Check if Profile Experience exists
  const experience = profile.experience.filter(
    (val) => val._id.toString() === req.params.experience_id
  );

  if (experience.length === 0) {
    return next(
      new ErrorResponse(
        `Experience ${req.params.experience_id} is not found to update `,
        404
      )
    );
  }
  //Build Object for Experience to be updated
  const experienceToBeUpdated = {};
  experienceToBeUpdated._id = experience[0].id;
  for (const key in req.body) {
    if (key in req.body) experienceToBeUpdated[key] = req.body[key];
  }

  //Finding right index to update experience
  const experienceRightIndexToPush = profile.experience
    .map((item) => item.id)
    .indexOf(req.params.experience_id);

  //pushing to the right index
  profile.experience[experienceRightIndexToPush] = experienceToBeUpdated;

  //saving profile to db
  await profile.save();

  res.status(200).json({ success: true, data: profile });
});

//@desc     Delete profile experinece
//route     DELETE /api/v1/profile/experience/:experience_id
//access    Private
exports.deleteUserProfileExperience = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id });

  //check if Profile Experience exists
  const experience = profile.experience.filter(
    (val) => val._id.toString() === req.params.experience_id
  );

  if (experience.length === 0) {
    return next(
      new ErrorResponse(
        `Experience ${req.params.experience_id} is not found to delete `,
        404
      )
    );
  }

  //Get experience(which is about to remove) by req.params.experience_id
  const aboutToRemoveExperience = profile.experience
    .map((item) => item.id)
    .indexOf(req.params.experience_id);

  //Removing experience using splice
  profile.experience.splice(aboutToRemoveExperience, 1);

  //saving profile to db
  await profile.save();

  res.status(200).json({ success: true, data: profile });
});

//@desc     Add profile education
//route     PUT /api/v1/profile/education
//access    Private
exports.addUserProfileEducation = asyncHandler(async (req, res, next) => {
  //check if profile exists
  let profile = await Profile.findOne({ user: req.user.id });
  if (!profile) {
    return next(
      new ErrorResponse(
        `No profile found associated with User ${req.user.id}`,
        404
      )
    );
  }

  //Build New Education Object From req.body
  const newEducation = {};
  for (const key in req.body) {
    if (key in req.body) newEducation[key] = req.body[key];
  }

  //Add New Education to Education object
  profile.education.unshift(newEducation);

  //If 'to' date present then remove current
  if (newEducation.to) profile.education[0].current = undefined;

  //saving profile to db
  await profile.save();

  res.status(200).json({ success: true, data: profile });
});

//@desc     Update profile Education
//route     PUT /api/v1/profile/experience/:education_id
//access    Private
exports.updateUserProfileEducation = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id });

  //Check if Profile Experience exists
  const education = profile.education.filter(
    (val) => val._id.toString() === req.params.education_id
  );

  if (education.length === 0) {
    return next(
      new ErrorResponse(
        `Education ${req.params.experience_id} is not found to update `,
        404
      )
    );
  }
  //Build Object for Education to be updated
  const educationToBeUpdated = {};
  educationToBeUpdated._id = education[0].id;
  for (const key in req.body) {
    if (key in req.body) educationToBeUpdated[key] = req.body[key];
  }

  //Finding right index to update experience
  const educationRightIndexToPush = profile.education
    .map((item) => item.id)
    .indexOf(req.params.education_id);

  //pushing to the right index
  profile.education[educationRightIndexToPush] = educationToBeUpdated;

  //saving profile to db
  await profile.save();

  res.status(200).json({ success: true, data: profile });
});

//@desc     Delete profile education
//route     DELETE /api/v1/profile/education/:education_id
//access    Private
exports.deleteUserProfileEducation = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id });

  //check if Profile Education exists
  const education = profile.education.filter(
    (val) => val._id.toString() === req.params.education_id
  );

  if (education.length === 0) {
    return next(
      new ErrorResponse(
        `Education ${req.params.education_id} is not found to delete `,
        404
      )
    );
  }

  //Get education(which is about to remove) by req.params.education_id
  const aboutToRemoveEducation = profile.education
    .map((item) => item.id)
    .indexOf(req.params.education_id);

  //Removing education using splice
  profile.education.splice(aboutToRemoveEducation, 1);

  //saving profile to db
  await profile.save();

  res.status(200).json({ success: true, data: profile });
});

//@desc     Get user repos from github
//route     GET /api/v1/profile/github/:username
//access    Private
exports.getUserGithubRepos = asyncHandler(async (req, res, next) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );
    const headers = {
      'user-agent': 'node.js',
      Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
    };

    const gitHubResponse = await axios.get(uri, { headers });

    if (gitHubResponse.data.length === 0) {
      return next(
        new ErrorResponse(`Repos not exists for this github profile`, 404)
      );
    }

    res.status(200).json({ success: true, data: gitHubResponse.data });
  } catch (err) {
    //Github profile not found
    if (err.response.status === 404) {
      return next(
        new ErrorResponse(
          `Github profile not found for user ${req.params.username}`,
          404
        )
      );
    }
  }
});
