/**
 * API Authentication Middleware
 * Validates API key from request headers
 */

const authenticate = (req, res, next) => {
  // Get API key from headers
  const apiKey = req.headers['x-api-key'] || req.headers['authorization'];

  // Check if API key exists
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'API key is required'
    });
  }

  // Validate API key against environment variable
  const validApiKey = process.env.WALLETWATCH_API_KEY;

  if (!validApiKey) {
    console.warn('⚠️  WALLETWATCH_API_KEY not configured in environment variables');
    return res.status(500).json({
      success: false,
      error: 'Server configuration error',
      message: 'API authentication not properly configured'
    });
  }

  // Check if provided API key matches
  if (apiKey !== validApiKey) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Invalid API key'
    });
  }

  // API key is valid, proceed to next middleware
  next();
};

module.exports = authenticate;
