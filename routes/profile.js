const express = require('express');
const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth');

//Controller files
//profile controller
const {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  getAllUserProfiles,
  getProfileByUserId,
} = require('../controllers/profile');

router
  .route('/')
  .get(getAllUserProfiles)
  .post(protect, createUserProfile)
  .put(protect, updateUserProfile);
router.route('/user/:user_id').get(getProfileByUserId);
router.route('/me').get(protect, getUserProfile);

module.exports = router;
