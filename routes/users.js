const express = require('express');
const router = express.Router({ mergeParams: true });

//Controller files
//user controller
const { getUsers } = require('../controllers/users');

router.route('/').get(getUsers);

module.exports = router;
