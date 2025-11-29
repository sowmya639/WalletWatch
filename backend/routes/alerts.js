const express = require('express');
const router = express.Router();
const {
  sendAlert,
  getAlertLogs
} = require('../controllers/alertController');

// POST /api/alerts/send - Send SMS alert manually
router.post('/send', sendAlert);

// GET /api/alerts/logs - Get alert history
router.get('/logs', getAlertLogs);

module.exports = router;
