const express = require('express');
const router = express.Router({ mergeParams: true });

//Controller files
//auth controller
const { authUser } = require('../controllers/auth');

router.route('/').get(authUser);

module.exports = router;
