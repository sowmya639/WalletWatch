const Budget = require('../models/Budget');
const Expense = require('../models/Expense');
const { calculateRemaining, getCurrentMonthYear } = require('../services/budgetCalculator');

/**
 * Set or update monthly budget
 * POST /api/budget
 */
const setBudget = async (req, res) => {
  try {
    const { amount } = req.body;

    // Validate amount
    if (!amount) {
      return res.status(400).json({
        success: false,
        error: 'Budget amount is required'
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Budget amount must be greater than 0'
      });
    }

    // Get current month and year
    const { month, year } = getCurrentMonthYear();

    // Check if budget already exists for this month
    let budget = await Budget.findOne({ month, year });

    if (budget) {
      // Update existing budget
      budget.amount = amount;
      budget.alertSent = false; // Reset alert flag when budget is updated
      await budget.save();
    } else {
      // Create new budget
      budget = new Budget({
        amount,
        month,
        year,
        alertSent: false
      });
      await budget.save();
    }

    // Calculate remaining budget
    const allExpenses = await Expense.find();
    const calculation = calculateRemaining(budget.amount, allExpenses);

    res.status(200).json({
      success: true,
      data: {
        budget,
        ...calculation
      },
      message: budget ? 'Budget updated successfully' : 'Budget created successfully'
    });
  } catch (error) {
    console.error('Set budget error:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.message
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to set budget',
      details: error.message
    });
  }
};

/**
 * Get current budget with remaining amount
 * GET /api/budget
 */
const getBudget = async (req, res) => {
  try {
    // Get current month and year
    const { month, year } = getCurrentMonthYear();

    // Find budget for current month
    const budget = await Budget.findOne({ month, year });

    if (!budget) {
      return res.status(200).json({
        success: true,
        data: {
          budgetAmount: 0,
          totalSpent: 0,
          remaining: 0,
          percentageUsed: 0,
          message: 'No budget set for current month'
        }
      });
    }

    // Get all expenses and calculate remaining
    const allExpenses = await Expense.find();
    const calculation = calculateRemaining(budget.amount, allExpenses);

    res.status(200).json({
      success: true,
      data: {
        budget,
        ...calculation,
        month,
        year
      }
    });
  } catch (error) {
    console.error('Get budget error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve budget',
      details: error.message
    });
  }
};

module.exports = {
  setBudget,
  getBudget
};
