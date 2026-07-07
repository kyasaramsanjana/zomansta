const express = require('express');
const router = express.Router();
const {
  uploadReel,
  getReels,
  getReel,
  toggleLike,
  toggleSave,
  removeReel
} = require('../controllers/reelController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getReels);
router.get('/:id', getReel);
router.post('/', protect, uploadReel);
router.put('/:id/like', protect, toggleLike);
router.put('/:id/save', protect, toggleSave);
router.delete('/:id', protect, removeReel);

module.exports = router;