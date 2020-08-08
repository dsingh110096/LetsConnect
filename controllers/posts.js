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

//@desc     Like a post
//route     PUT /api/v1/posts/likes/:post_id
//access    Private
exports.addUserLike = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.post_id);
  const user = await User.findById(req.user.id);

  //Check if post exists
  if (!post) {
    return next(
      new ErrorResponse(`No Post found with id ${req.params.post_id}`)
    );
  }

  //Check if post already liked by the user
  const alreadyLiked =
    post.likes.filter((like) => like.user.toString() === req.user.id).length >
    0;
  if (alreadyLiked) {
    return next(new ErrorResponse(`Post already liked by user ${req.user.id}`));
  }

  const likeInfo = {
    user: req.user.id,
    name: user.name,
    avatar: user.avatar,
  };

  //If not liked
  post.likes.unshift(likeInfo);

  //saving to the db
  await post.save();

  res.status(200).json({ success: true, data: post.likes });
});

//@desc     Remove user like
//route     PUT /api/v1/posts/removelike/:post_id
//access    Private
exports.removeUserLike = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.post_id);

  //Check if post exists
  if (!post) {
    return next(
      new ErrorResponse(`No Post found with id ${req.params.post_id}`)
    );
  }

  //Check if post not liked by the user
  const notLiked =
    post.likes.filter((like) => like.user.toString() === req.user.id).length ===
    0;
  if (notLiked) {
    return next(
      new ErrorResponse(`Post has not been liked yet by user ${req.user.id}`)
    );
  }

  //Finding removing index for user like
  const removeIndex = post.likes
    .map((like) => like.user.toString())
    .indexOf(req.user.id);

  //removing like
  post.likes.splice(removeIndex, 1);

  //saving to the db
  await post.save();

  res
    .status(200)
    .json({ success: true, data: post.likes, msg: 'like removed...' });
});

//@desc     Comment on user post
//route     POST /api/v1/posts/comments/:post_id
//access    Private
exports.addCommentOnPost = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');
  const post = await Post.findById(req.params.post_id);
  //Check if post exists
  if (!post) {
    return next(new ErrorResponse('Post not found', 404));
  }
  //Making new post
  const newComment = {
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
    user: req.user.id,
  };

  //pushing new comment at initial index in comments array.
  post.comments.unshift(newComment);

  //Saving post to the DB
  await post.save();

  res.status(200).json({ success: true, data: post.comments });
});

//@desc     Remove user comment
//route     DELETE /api/v1/posts/removecomment/:post_id/:comment_id
//access    Private
exports.removeCommentFromPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.post_id);

  //Check if post exists
  if (!post) {
    return next(
      new ErrorResponse(`No Post found with id ${req.params.post_id}`)
    );
  }

  //Check if post has comment or not
  const comment = post.comments.find(
    (comment) => comment.id === req.params.comment_id
  );

  if (!comment) {
    return next(new ErrorResponse('Comment doest not exists...'));
  }

  //Make sure user own's the comment
  if (comment.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} not authorized to delete the comment ${req.params.comment_id}`
      )
    );
  }

  //Finding removing index for user comment
  const removeIndex = post.comments
    .map((comment) => comment.user.toString())
    .indexOf(req.user.id);

  //removing comment
  post.comments.splice(removeIndex, 1);

  //saving to the db
  await post.save();

  res
    .status(200)
    .json({ success: true, data: post.comments, msg: 'comment deleted...' });
});
