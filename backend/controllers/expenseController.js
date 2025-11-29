const Expense = require('../models/Expense');
const Budget = require('../models/Budget');
const { calculateRemaining, getCurrentMonthYear } = require('../services/budgetCalculator');
const { shouldSendAlert, sendBudgetAlert } = require('../services/alertService');

/**
 * Create a new expense
 * POST /api/expenses
 */
const createExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;

    // Validate required fields
    if (!amount || !category) {
      return res.status(400).json({
        success: false,
        error: 'Amount and category are required'
      });
    }

    // Validate amount is positive
    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Amount must be greater than 0'
      });
    }

    // Create expense
    const expense = new Expense({
      amount,
      category: category.trim(),
      description: description ? description.trim() : '',
      date: date || new Date()
    });

    await expense.save();

    // Check if budget alert should be triggered
    const { month, year } = getCurrentMonthYear();
    const budget = await Budget.findOne({ month, year });

    if (budget) {
      // Get all expenses for current month
      const allExpenses = await Expense.find();
      const calculation = calculateRemaining(budget.amount, allExpenses);

      // Check if alert should be sent
      if (shouldSendAlert(budget, calculation.totalSpent)) {
        try {
          await sendBudgetAlert(budget, calculation.totalSpent);
          // Mark alert as sent
          budget.alertSent = true;
          await budget.save();
        } catch (alertError) {
          console.error('Failed to send alert:', alertError.message);
          // Continue even if alert fails
        }
      }
    }

    res.status(201).json({
      success: true,
      data: expense,
      message: 'Expense created successfully'
    });
  } catch (error) {
    console.error('Create expense error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.message
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to create expense',
      details: error.message
    });
  }
};

/**
 * Get all expenses
 * GET /api/expenses
 */
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find()
      .sort({ date: -1 }) // Sort by date descending (newest first)
      .lean();

    res.status(200).json({
      success: true,
      data: expenses,
      count: expenses.length
    });
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve expenses',
      details: error.message
    });
  }
};

/**
 * Delete an expense
 * DELETE /api/expenses/:id
 */
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid expense ID format'
      });
    }

    const expense = await Expense.findByIdAndDelete(id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully',
      data: expense
    });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete expense',
      details: error.message
    });
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  deleteExpense
};
