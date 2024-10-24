const express = require('express');
const Donation = require('../models/Donation');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Add a food donation (Donor only)
router.post('/donate', authMiddleware, async (req, res) => {
  const { foodType, quantity } = req.body;
  try {
    const donation = new Donation({
      donorId: req.user.id,
      foodType,
      quantity
    });
    await donation.save();
    res.status(201).json({ msg: 'Donation added successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all donations made by the logged-in donor
router.get('/my-donations', authMiddleware, async (req, res) => {
  try {
    const donations = await Donation.find({ donorId: req.user.id });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
