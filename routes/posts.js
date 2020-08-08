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
  addUserLike,
  removeUserLike,
} = require('../controllers/posts');

router.route('/').post(protect, createPost).get(protect, getAllPosts);
router
  .route('/:post_id')
  .get(protect, getPostById)
  .delete(protect, deletePostById);
router.route('/likes/:post_id').put(protect, addUserLike);
router.route('/removelike/:post_id').put(protect, removeUserLike);

module.exports = router;
