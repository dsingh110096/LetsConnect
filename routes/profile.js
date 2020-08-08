const express = require('express');
const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth');

//Controller files
//profile controller
const {
  getUserProfile,
  createAndUpdateUserProfile,
  getAllUserProfiles,
  getProfileByUserId,
  addUserProfileExperience,
  updateUserProfileExperience,
  deleteUserProfileExperience,
  addUserProfileEducation,
  updateUserProfileEducation,
  deleteUserProfileEducation,
  getUserGithubRepos,
} = require('../controllers/profile');

router
  .route('/')
  .get(getAllUserProfiles)
  .post(protect, createAndUpdateUserProfile);

router.route('/experience').put(protect, addUserProfileExperience);

router
  .route('/experience/:experience_id')
  .put(protect, updateUserProfileExperience)
  .delete(protect, deleteUserProfileExperience);

router.route('/education').put(protect, addUserProfileEducation);

router
  .route('/education/:education_id')
  .put(protect, updateUserProfileEducation)
  .delete(protect, deleteUserProfileEducation);

router.route('/user/:user_id').get(getProfileByUserId);

router.route('/me').get(protect, getUserProfile);

router.route('/github/:username').get(getUserGithubRepos);

module.exports = router;
