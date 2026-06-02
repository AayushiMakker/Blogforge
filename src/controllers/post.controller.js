const postService = require('../services/post.service');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/response');

const getPosts = asyncHandler(async (req, res) => {
  const posts = await postService.getPosts(req.query);
  sendSuccess(res, posts);
});

const getPost = asyncHandler(async (req, res) => {
  const post = await postService.getPostById(req.params.id);
  sendSuccess(res, post);
});

const createPost = asyncHandler(async (req, res) => {
  const post = await postService.createPost(req.body, req.user._id);
  sendSuccess(res, post, 201);
});

const updatePost = asyncHandler(async (req, res) => {
  const post = await postService.updatePost(req.params.id, req.body, req.user._id);
  sendSuccess(res, post);
});

const deletePost = asyncHandler(async (req, res) => {
  await postService.deletePost(req.params.id, req.user._id);
  sendSuccess(res, null, 204);
});

module.exports = { getPosts, getPost, createPost, updatePost, deletePost };
