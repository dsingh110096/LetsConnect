const express = require('express');
const router = express.Router({ mergeParams: true });

//Controller files
//profile controller
const { getProfiles } = require('../controllers/profile');

router.route('/').get(getProfiles);

module.exports = router;
