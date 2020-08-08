//Middleware and utils files
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

//Model files
const User = require('../models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');

//@desc     Create user post
//route     POST /api/v1/posts
//access    Private
exports.createPost = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');
  //Check if user exists
  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }
  //Making new post
  const newPost = new Post({
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
    user: req.user.id,
  });

  //Saving post to the DB
  const post = await newPost.save();
  res.status(200).json({ success: true, data: post });
});

//@desc     Get all posts
//route     GET /api/v1/posts
//access    Private
exports.getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: posts.length, data: posts });
});

//@desc     Get post by id
//route     GET /api/v1/posts/:post_id
//access    Private
exports.getPostById = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.post_id);

  //Check if post exists
  if (!post) {
    return next(
      new ErrorResponse(`No Post found with id ${req.params.post_id}`)
    );
  }

  res.status(200).json({ success: true, data: post });
});

//@desc     Delete Post by id
//route     DELETE /api/v1/posts/:post_id
//access    Private
exports.deletePostById = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.post_id);

  //Check if post exists
  if (!post) {
    return next(
      new ErrorResponse(`No Post found with id ${req.params.post_id}`, 404)
    );
  }

  //Make sure user own's the post
  if (post.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} not authorized to delete the post ${req.params.post_id}`,
        401
      )
    );
  }

  //Removing post
  await post.remove();

  res
    .status(200)
    .json({ success: true, data: {}, msg: 'Post Deleted Successfully...' });
});
