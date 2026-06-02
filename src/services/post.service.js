const Post = require('../models/Post');

const getPosts = ({ page = 1, limit = 10, tag, search } = {}) => {
  const filter = { published: true };
  if (tag) filter.tags = tag;
  if (search) filter.$text = { $search: search };

  return Post.find(filter)
    .populate('author', 'name email')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
};

const getPostById = async (id) => {
  const post = await Post.findById(id).populate('author', 'name email');
  if (!post) {
    const err = new Error('Post not found');
    err.statusCode = 404;
    throw err;
  }
  return post;
};

const createPost = (data, authorId) =>
  Post.create({ ...data, author: authorId });

const updatePost = async (id, data, userId) => {
  const post = await Post.findById(id);
  if (!post) {
    const err = new Error('Post not found');
    err.statusCode = 404;
    throw err;
  }
  if (post.author.toString() !== userId.toString()) {
    const err = new Error('Not authorized');
    err.statusCode = 403;
    throw err;
  }
  Object.assign(post, data);
  return post.save();
};

const deletePost = async (id, userId) => {
  const post = await Post.findById(id);
  if (!post) {
    const err = new Error('Post not found');
    err.statusCode = 404;
    throw err;
  }
  if (post.author.toString() !== userId.toString()) {
    const err = new Error('Not authorized');
    err.statusCode = 403;
    throw err;
  }
  await post.deleteOne();
};

module.exports = { getPosts, getPostById, createPost, updatePost, deletePost };
