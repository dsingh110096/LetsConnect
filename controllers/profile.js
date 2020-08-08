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

//@desc     Create and Update user profile
//route     POST /api/v1/profile
//access    Private
exports.createAndUpdateUserProfile = asyncHandler(async (req, res, next) => {
  //Destructuring variables from req.body
  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
  } = req.body;

  //Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (status) profileFields.status = status;
  if (skills) {
    profileFields.skills = skills.split(',').map((skill) => skill.trim());
  }
  if (bio) profileFields.bio = bio;
  if (githubusername) profileFields.githubusername = githubusername;

  //Build social object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (instagram) profileFields.social.instagram = instagram;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;

  let profile = await Profile.findOne({ user: req.user.id });

  //check if profile exists then update the profile
  if (profile) {
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      profileFields,
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(profile.id);
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
  const { title, company, location, from, to, current, description } = req.body;

  const newExperience = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  let profile = await Profile.findOne({ user: req.user.id });

  //check if profile exists
  if (!profile) {
    return next(
      new ErrorResponse(
        `No profile found associated with User ${req.user.id}`,
        404
      )
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

  //unshift means here newly added experinece will comes at first always
  profile.experience.unshift(newExperience);
  //saving profile to db
  await profile.save();

  res.status(200).json({ success: true, data: profile });
});

//@desc     Update profile experinece
//route     PUT /api/v1/profile/experience/:experience_id
//access    Private
exports.updateUserProfileExperience = asyncHandler(async (req, res, next) => {
  const { title, company, location, from, to, current, description } = req.body;

  let profile = await Profile.findOne({ user: req.user.id });

  //check if profile exists
  if (!profile) {
    return next(
      new ErrorResponse(
        `No profile found associated with User ${req.user.id}`,
        404
      )
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

  let updatedExperience = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };
  updatedExperience.id = req.params.experience_id;

  //Get experience(which is about to update) by req.params.experience_id
  let experience = profile.experience
    .filter((value) => value.id === req.params.experience_id)
    .map((item) => item);

  //updating experience
  if (current) experience[0].current = updatedExperience.current;
  if (!current) experience[0].current = undefined;
  if (title) experience[0].title = updatedExperience.title;
  if (!title) experience[0].title = undefined;
  if (company) experience[0].company = updatedExperience.company;
  if (!company) experience[0].company = undefined;
  if (location) experience[0].location = updatedExperience.location;
  if (!location) experience[0].location = undefined;
  if (from) experience[0].from = updatedExperience.from;
  if (!from) experience[0].from = undefined;
  if (to) experience[0].to = updatedExperience.to;
  if (!to) experience[0].to = undefined;
  if (description) experience[0].description = updatedExperience.description;
  if (!description) experience[0].description = undefined;

  await profile.save();

  res.status(200).json({ success: true, data: profile.experience });
});

//@desc     Delete profile experinece
//route     DELETE /api/v1/profile/experience/:experience_id
//access    Private
exports.deleteUserProfileExperience = asyncHandler(async (req, res, next) => {
  let profile = await Profile.findOne({ user: req.user.id });

  //check if profile exists
  if (!profile) {
    return next(
      new ErrorResponse(
        `No profile found associated with User ${req.user.id}`,
        404
      )
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

  //Get experience(which is about to remove) by req.params.experience_id
  const experience = profile.experience
    .map((item) => item.id)
    .indexOf(req.params.experience_id);

  //Removing experience using splice
  profile.experience.splice(experience, 1);

  //saving profile to db
  await profile.save();

  res.status(200).json({ success: true, data: profile });
});

//@desc     Add profile education
//route     PUT /api/v1/profile/education
//access    Private
exports.addUserProfileEducation = asyncHandler(async (req, res, next) => {
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;

  const newEducation = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  let profile = await Profile.findOne({ user: req.user.id });

  //check if profile exists
  if (!profile) {
    return next(
      new ErrorResponse(
        `No profile found associated with User ${req.user.id}`,
        404
      )
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

  //unshift means here newly added experinece will comes at first always
  profile.education.unshift(newEducation);
  //saving profile to db
  await profile.save();

  res.status(200).json({ success: true, data: profile });
});

//@desc     Update profile Education
//route     PUT /api/v1/profile/experience/:education_id
//access    Private
exports.updateUserProfileEducation = asyncHandler(async (req, res, next) => {
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;

  let profile = await Profile.findOne({ user: req.user.id });

  //check if profile exists
  if (!profile) {
    return next(
      new ErrorResponse(
        `No profile found associated with User ${req.user.id}`,
        404
      )
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

  let updatedEducation = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };
  updatedEducation.id = req.params.education_id;

  //Get education(which is about to update) by req.params.education_id
  let education = profile.education
    .filter((value) => value.id === req.params.education_id)
    .map((item) => item);

  //updating experience
  if (current) education[0].current = updatedEducation.current;
  if (!current) education[0].current = undefined;
  if (school) education[0].school = updatedEducation.school;
  if (!school) education[0].school = undefined;
  if (degree) education[0].degree = updatedEducation.degree;
  if (!degree) education[0].degree = undefined;
  if (fieldofstudy) education[0].fieldofstudy = updatedEducation.fieldofstudy;
  if (!fieldofstudy) education[0].fieldofstudy = undefined;
  if (from) education[0].from = updatedEducation.from;
  if (!from) education[0].from = undefined;
  if (to) education[0].to = updatedEducation.to;
  if (!to) education[0].to = undefined;
  if (description) education[0].description = updatedEducation.description;
  if (!description) education[0].description = undefined;

  await profile.save();

  res.status(200).json({ success: true, data: profile.education });
});

//@desc     Delete profile education
//route     DELETE /api/v1/profile/education/:education_id
//access    Private
exports.deleteUserProfileEducation = asyncHandler(async (req, res, next) => {
  let profile = await Profile.findOne({ user: req.user.id });

  //check if profile exists
  if (!profile) {
    return next(
      new ErrorResponse(
        `No profile found associated with User ${req.user.id}`,
        404
      )
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

  //Get education(which is about to remove) by req.params.education_id
  const education = profile.education
    .map((item) => item.id)
    .indexOf(req.params.education_id);

  //Removing experience using splice
  profile.education.splice(education, 1);

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
