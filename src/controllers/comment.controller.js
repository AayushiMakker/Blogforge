const commentService = require('../services/comment.service');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/response');

const getComments = asyncHandler(async (req, res) => {
  const comments = await commentService.getComments(req.params.postId);
  sendSuccess(res, comments);
});

const addComment = asyncHandler(async (req, res) => {
  const comment = await commentService.addComment(req.params.postId, req.body.body, req.user._id);
  sendSuccess(res, comment, 201);
});

const deleteComment = asyncHandler(async (req, res) => {
  await commentService.deleteComment(req.params.id, req.user._id);
  sendSuccess(res, null, 204);
});

module.exports = { getComments, addComment, deleteComment };
