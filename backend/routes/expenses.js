const express = require('express');
const router = express.Router();
const {
  createExpense,
  getAllExpenses,
  deleteExpense
} = require('../controllers/expenseController');

// POST /api/expenses - Create new expense
router.post('/', createExpense);

// GET /api/expenses - Get all expenses
router.get('/', getAllExpenses);

// DELETE /api/expenses/:id - Delete expense
router.delete('/:id', deleteExpense);

module.exports = router;
