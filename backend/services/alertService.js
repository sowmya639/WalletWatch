/**
 * Alert Service
 * Handles SMS alerts via Twilio and alert logging
 */

const twilio = require('twilio');
const Alert = require('../models/Alert');

// Initialize Twilio client
let twilioClient = null;

const initializeTwilio = () => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (!accountSid || !authToken) {
    console.warn('⚠️  Twilio credentials not configured. SMS alerts will be logged but not sent.');
    return null;
  }

  try {
    twilioClient = twilio(accountSid, authToken);
    console.log('✅ Twilio client initialized successfully');
    return twilioClient;
  } catch (error) {
    console.error('❌ Failed to initialize Twilio client:', error.message);
    return null;
  }
};

/**
 * Send SMS alert via Twilio
 * @param {String} phoneNumber - Recipient phone number
 * @param {String} message - Alert message
 * @returns {Object} Result with status and details
 */
const sendSMS = async (phoneNumber, message) => {
  // Initialize Twilio if not already done
  if (!twilioClient) {
    twilioClient = initializeTwilio();
  }

  // If Twilio is not configured, log and return failed status
  if (!twilioClient) {
    console.warn('⚠️  Twilio not configured. Alert logged but not sent.');
    return {
      success: false,
      status: 'failed',
      error: 'Twilio credentials not configured'
    };
  }

  const fromNumber = process.env.TWILIO_PHONE_NUMBER;
  
  if (!fromNumber) {
    console.error('❌ Twilio phone number not configured');
    return {
      success: false,
      status: 'failed',
      error: 'Twilio phone number not configured'
    };
  }

  try {
    const result = await twilioClient.messages.create({
      body: message,
      from: fromNumber,
      to: phoneNumber
    });

    console.log('✅ SMS sent successfully:', result.sid);
    return {
      success: true,
      status: 'sent',
      sid: result.sid
    };
  } catch (error) {
    console.error('❌ Failed to send SMS:', error.message);
    return {
      success: false,
      status: 'failed',
      error: error.message
    };
  }
};

/**
 * Log alert to database
 * @param {String} message - Alert message
 * @param {String} status - Alert status (sent/failed/pending)
 * @param {String} recipient - Recipient phone number
 * @param {Number} budgetAmount - Budget amount at time of alert
 * @param {Number} spentAmount - Spent amount at time of alert
 * @returns {Object} Created alert document
 */
const logAlert = async (message, status, recipient, budgetAmount, spentAmount) => {
  try {
    const alert = new Alert({
      message,
      status,
      recipient: recipient || '',
      timestamp: new Date(),
      budgetAmount,
      spentAmount
    });

    await alert.save();
    console.log('✅ Alert logged to database');
    return alert;
  } catch (error) {
    console.error('❌ Failed to log alert:', error.message);
    throw error;
  }
};

/**
 * Determine if alert should be sent based on budget and expenses
 * @param {Object} budget - Budget document
 * @param {Number} totalSpent - Total amount spent
 * @returns {Boolean} True if alert should be sent
 */
const shouldSendAlert = (budget, totalSpent) => {
  if (!budget || budget.amount <= 0) {
    return false;
  }

  // Check if alert already sent for this budget period
  if (budget.alertSent) {
    return false;
  }

  // Check if 80% threshold crossed
  const threshold = budget.amount * 0.8;
  return totalSpent >= threshold;
};

/**
 * Send budget threshold alert
 * @param {Object} budget - Budget document
 * @param {Number} totalSpent - Total amount spent
 * @returns {Object} Alert result
 */
const sendBudgetAlert = async (budget, totalSpent) => {
  const recipient = process.env.RECIPIENT_PHONE_NUMBER;
  const percentageUsed = Math.round((totalSpent / budget.amount) * 100);
  const remaining = budget.amount - totalSpent;

  const message = `🚨 WalletWatch Alert: You've used ${percentageUsed}% of your monthly budget. Spent: $${totalSpent.toFixed(2)}, Remaining: $${remaining.toFixed(2)}`;

  // Send SMS
  const smsResult = await sendSMS(recipient, message);

  // Log alert to database
  const alert = await logAlert(
    message,
    smsResult.status,
    recipient,
    budget.amount,
    totalSpent
  );

  return {
    alert,
    smsResult
  };
};

module.exports = {
  sendSMS,
  logAlert,
  shouldSendAlert,
  sendBudgetAlert,
  initializeTwilio
};
