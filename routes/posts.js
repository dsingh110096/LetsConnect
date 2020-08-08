const express = require('express');
const router = express.Router({ mergeParams: true });
const { protect } = require('../middleware/auth');

//Controller files
//post controller
const {
  createPost,
  getAllPosts,
  getPostById,
  deletePostById,
} = require('../controllers/posts');

router.route('/').post(protect, createPost).get(protect, getAllPosts);
router
  .route('/:post_id')
  .get(protect, getPostById)
  .delete(protect, deletePostById);

module.exports = router;
