const express = require('express');
const router = express.Router();
const {
  setBudget,
  getBudget
} = require('../controllers/budgetController');

// POST /api/budget - Set or update monthly budget
router.post('/', setBudget);

// GET /api/budget - Get current budget with remaining amount
router.get('/', getBudget);

module.exports = router;
