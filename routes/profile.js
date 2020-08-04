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
  updateUserProfileExperience,
} = require('../controllers/profile');

router
  .route('/')
  .get(getAllUserProfiles)
  .post(protect, createAndUpdateUserProfile);
router.route('/experience').put(protect, updateUserProfileExperience);
router.route('/user/:user_id').get(getProfileByUserId);
router.route('/me').get(protect, getUserProfile);

module.exports = router;
