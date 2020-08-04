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
  updateUserProfileEducation,
  deleteUserProfileEducation,
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

router.route('/education').put(protect, updateUserProfileEducation);

router
  .route('/education/:education_id')
  .delete(protect, deleteUserProfileEducation);

router.route('/user/:user_id').get(getProfileByUserId);

router.route('/me').get(protect, getUserProfile);

module.exports = router;
