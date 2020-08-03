const express = require('express');
const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth');

//Controller files
//profile controller
const {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
} = require('../controllers/profile');

router.route('/').post(protect, createUserProfile);
router.route('/:id').put(protect, updateUserProfile);
router.route('/me').get(protect, getUserProfile);

module.exports = router;
