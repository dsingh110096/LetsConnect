const express = require('express');
const router = express.Router({ mergeParams: true });

//Controller files
//post controller
const { getPosts } = require('../controllers/posts');

router.route('/').get(getPosts);

module.exports = router;
