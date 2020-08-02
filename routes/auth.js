const express = require('express');
const router = express.Router({ mergeParams: true });

//Controller files
//auth controller
const { register } = require('../controllers/auth');

router.route('/register').post(register);

module.exports = router;
