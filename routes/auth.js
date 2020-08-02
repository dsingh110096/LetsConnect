const express = require('express');
const router = express.Router({ mergeParams: true });

//middleare file
const { protect } = require('../middleware/auth');

//Controller files
//auth controller
const { register, getMe, login } = require('../controllers/auth');

router.route('/register').post(register);
router.route('/getme').get(protect, getMe);
router.route('/login').post(login);

module.exports = router;
