const Comment = require('../models/Comment');

const addComment = async (reelId, userId, content) => {
  const comment = await Comment.create({
    reel: reelId,
    postedBy: userId,
    content
  });
  return comment.populate('postedBy', 'name avatar');
};

const getCommentsByReel = async (reelId) => {
  const comments = await Comment.find({ reel: reelId })
    .populate('postedBy', 'name avatar')
    .sort({ createdAt: -1 });
  return comments;
};

const deleteComment = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new Error('Comment not found');
  if (comment.postedBy.toString() !== userId) {
    throw new Error('Not authorized');
  }
  await comment.deleteOne();
  return { message: 'Comment deleted' };
};

module.exports = {
  addComment,
  getCommentsByReel,
  deleteComment
};
