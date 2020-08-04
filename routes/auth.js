const express = require('express');
const router = express.Router({ mergeParams: true });

//middleare file
const { protect } = require('../middleware/auth');

//Controller files
//auth controller
const {
  register,
  getMe,
  login,
  updateMe,
  deleteMyAccount,
} = require('../controllers/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/getme').get(protect, getMe);
router.route('/updateme').put(protect, updateMe);
router.route('/deleteaccount').delete(protect, deleteMyAccount);

module.exports = router;
