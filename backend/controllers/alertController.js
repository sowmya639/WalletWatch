const Alert = require('../models/Alert');
const { sendSMS } = require('../services/alertService');

/**
 * Send SMS alert manually
 * POST /api/alerts/send
 */
const sendAlert = async (req, res) => {
  try {
    const { phoneNumber, message, budgetAmount, spentAmount } = req.body;

    // Validate required fields
    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    const recipient = phoneNumber || process.env.RECIPIENT_PHONE_NUMBER;

    if (!recipient) {
      return res.status(400).json({
        success: false,
        error: 'Phone number is required'
      });
    }

    // Send SMS
    const smsResult = await sendSMS(recipient, message);

    // Log alert to database
    const alert = new Alert({
      message,
      recipient,
      status: smsResult.status,
      timestamp: new Date(),
      budgetAmount: budgetAmount || 0,
      spentAmount: spentAmount || 0
    });

    await alert.save();

    res.status(200).json({
      success: smsResult.success,
      data: {
        alert,
        smsResult
      },
      message: smsResult.success ? 'Alert sent successfully' : 'Alert logged but SMS failed'
    });
  } catch (error) {
    console.error('Send alert error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send alert',
      details: error.message
    });
  }
};

/**
 * Get alert logs
 * GET /api/alerts/logs
 */
const getAlertLogs = async (req, res) => {
  try {
    const alerts = await Alert.find()
      .sort({ timestamp: -1 }) // Sort by timestamp descending (newest first)
      .lean();

    res.status(200).json({
      success: true,
      data: alerts,
      count: alerts.length
    });
  } catch (error) {
    console.error('Get alert logs error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve alert logs',
      details: error.message
    });
  }
};

module.exports = {
  sendAlert,
  getAlertLogs
};
