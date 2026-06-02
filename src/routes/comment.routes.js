const { Router } = require('express');
const { getComments, addComment, deleteComment } = require('../controllers/comment.controller');
const { protect } = require('../middlewares/auth');

const router = Router();

// Mounted under /api/posts/:postId/comments
router.get('/', getComments);
router.post('/', protect, addComment);
router.delete('/:id', protect, deleteComment);

module.exports = router;
