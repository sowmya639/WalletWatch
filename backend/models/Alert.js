const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Alert message is required'],
    trim: true
  },
  recipient: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    required: [true, 'Alert status is required'],
    enum: ['sent', 'failed', 'pending'],
    default: 'pending'
  },
  timestamp: {
    type: Date,
    required: [true, 'Timestamp is required'],
    default: Date.now
  },
  budgetAmount: {
    type: Number,
    required: [true, 'Budget amount is required'],
    min: 0
  },
  spentAmount: {
    type: Number,
    required: [true, 'Spent amount is required'],
    min: 0
  }
}, {
  timestamps: true
});

// Index for faster timestamp-based queries and sorting
alertSchema.index({ timestamp: -1 });

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;
