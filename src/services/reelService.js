const Reel = require('../models/Reel');

const createReel = async (data) => {
  const reel = await Reel.create(data);
  return reel;
};

const getAllReels = async () => {
  const reels = await Reel.find()
    .populate('postedBy', 'name avatar')
    .populate('restaurant', 'name')
    .sort({ score: -1, createdAt: -1 });
  return reels;
};

const getReelById = async (id) => {
  const reel = await Reel.findById(id)
    .populate('postedBy', 'name avatar')
    .populate('restaurant', 'name');
  if (!reel) throw new Error('Reel not found');
  return reel;
};

const likeReel = async (reelId, userId) => {
  const reel = await Reel.findById(reelId);
  if (!reel) throw new Error('Reel not found');

  const alreadyLiked = reel.likes.includes(userId);

  if (alreadyLiked) {
    reel.likes = reel.likes.filter(id => id.toString() !== userId);
  } else {
    reel.likes.push(userId);
  }

  // Update score
  reel.score = reel.likes.length * 3 + reel.saves.length * 5;
  await reel.save();
  return reel;
};

const saveReel = async (reelId, userId) => {
  const reel = await Reel.findById(reelId);
  if (!reel) throw new Error('Reel not found');

  const alreadySaved = reel.saves.includes(userId);

  if (alreadySaved) {
    reel.saves = reel.saves.filter(id => id.toString() !== userId);
  } else {
    reel.saves.push(userId);
  }

  reel.score = reel.likes.length * 3 + reel.saves.length * 5;
  await reel.save();
  return reel;
};

const deleteReel = async (reelId, userId) => {
  const reel = await Reel.findById(reelId);
  if (!reel) throw new Error('Reel not found');
  if (reel.postedBy.toString() !== userId) {
    throw new Error('Not authorized');
  }
  await reel.deleteOne();
  return { message: 'Reel deleted' };
};

module.exports = {
  createReel,
  getAllReels,
  getReelById,
  likeReel,
  saveReel,
  deleteReel
};