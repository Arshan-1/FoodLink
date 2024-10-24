const express = require('express');
const Donation = require('../models/Donation');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get all available donations (Receiver only)
router.get('/available', authMiddleware, async (req, res) => {
  try {
    const donations = await Donation.find({ isClaimed: false });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Claim a donation (Receiver only)
router.post('/claim/:id', authMiddleware, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation || donation.isClaimed) {
      return res.status(400).json({ msg: 'Donation unavailable' });
    }
    donation.isClaimed = true;
    await donation.save();
    res.json({ msg: 'Donation claimed successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
