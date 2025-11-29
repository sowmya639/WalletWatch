require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Authentication middleware
const authenticate = require('./middleware/auth');

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'WalletWatch API is running' });
});

// API Routes (with authentication)
app.use('/api/expenses', authenticate, require('./routes/expenses'));
app.use('/api/budget', authenticate, require('./routes/budget'));
app.use('/api/alerts', authenticate, require('./routes/alerts'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 WalletWatch API server running on port ${PORT}`);
});

module.exports = app;
