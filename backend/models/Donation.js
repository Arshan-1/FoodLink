const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  foodType: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isClaimed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Donation', DonationSchema);
