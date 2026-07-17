const asyncHandler = require('../utils/asyncHandler');
const {
  createReel,
  getAllReels,
  getReelById,
  likeReel,
  saveReel,
  deleteReel
} = require('../services/reelService');
const uploadReel = asyncHandler(async (req, res) => {
  const { title, description, videoUrl, thumbnail, restaurant, tags } = req.body;
  if (!title || !videoUrl || !restaurant) {
    res.status(400);
    throw new Error('Title, videoUrl and restaurant are required');
  }

  const reel = await createReel({
    title,
    description,
    videoUrl,
    thumbnail,
    restaurant,
    tags,
    postedBy: req.user._id
  });

  res.status(201).json({ success: true, data: reel });
});

const getReels = asyncHandler(async (req, res) => {
  const reels = await getAllReels();
  res.status(200).json({ success: true, data: reels });
});

const getReel = asyncHandler(async (req, res) => {
  const reel = await getReelById(req.params.id);
  res.status(200).json({ success: true, data: reel });
});

const toggleLike = asyncHandler(async (req, res) => {
  const reel = await likeReel(req.params.id, req.user._id.toString());
  res.status(200).json({ success: true, data: reel });
});

const toggleSave = asyncHandler(async (req, res) => {
  const reel = await saveReel(req.params.id, req.user._id.toString());
  res.status(200).json({ success: true, data: reel });
});
const removeReel = asyncHandler(async (req, res) => {
  const result = await deleteReel(req.params.id, req.user._id.toString());
  res.status(200).json({ success: true, data: result });
});

module.exports = {
  uploadReel,
  getReels,
  getReel,
  toggleLike,
  toggleSave,
  removeReel
};
