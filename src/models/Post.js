const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    content: { type: String, required: [true, 'Content is required'] },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [{ type: String, trim: true, lowercase: true }],
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Text index for basic search
postSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Post', postSchema);
