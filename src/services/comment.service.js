const Comment = require('../models/Comment');
const Post = require('../models/Post');

const getComments = (postId) =>
  Comment.find({ post: postId }).populate('author', 'name').sort({ createdAt: -1 });

const addComment = async (postId, body, userId) => {
  const postExists = await Post.exists({ _id: postId });
  if (!postExists) {
    const err = new Error('Post not found');
    err.statusCode = 404;
    throw err;
  }
  return Comment.create({ body, post: postId, author: userId });
};

const deleteComment = async (id, userId) => {
  const comment = await Comment.findById(id);
  if (!comment) {
    const err = new Error('Comment not found');
    err.statusCode = 404;
    throw err;
  }
  if (comment.author.toString() !== userId.toString()) {
    const err = new Error('Not authorized');
    err.statusCode = 403;
    throw err;
  }
  await comment.deleteOne();
};

module.exports = { getComments, addComment, deleteComment };
