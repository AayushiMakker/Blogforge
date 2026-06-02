const { Router } = require('express');
const { getPosts, getPost, createPost, updatePost, deletePost } = require('../controllers/post.controller');
const { protect } = require('../middlewares/auth');

const router = Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;
