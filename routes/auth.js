const express = require('express');
const router = express.Router({ mergeParams: true });

//middleare file
const { protect } = require('../middleware/auth');

//Controller files
//auth controller
const { register, getMe } = require('../controllers/auth');

router.route('/register').post(register);
router.route('/getme').get(protect, getMe);

module.exports = router;
