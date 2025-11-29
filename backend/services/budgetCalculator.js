/**
 * Budget Calculator Service
 * Handles all budget-related calculations and threshold checks
 */

/**
 * Get expenses for the current month
 * @param {Array} expenses - Array of expense objects
 * @returns {Array} Filtered expenses for current month
 */
const getCurrentMonthExpenses = (expenses) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && 
           expenseDate.getFullYear() === currentYear;
  });
};

/**
 * Calculate remaining budget
 * @param {Number} budgetAmount - Monthly budget amount
 * @param {Array} expenses - Array of expense objects
 * @returns {Object} Calculation results
 */
const calculateRemaining = (budgetAmount, expenses) => {
  const currentMonthExpenses = getCurrentMonthExpenses(expenses);
  
  const totalSpent = currentMonthExpenses.reduce((sum, expense) => {
    return sum + (expense.amount || 0);
  }, 0);

  const remaining = budgetAmount - totalSpent;
  const percentageUsed = budgetAmount > 0 ? (totalSpent / budgetAmount) * 100 : 0;

  return {
    budgetAmount,
    totalSpent: Math.round(totalSpent * 100) / 100, // Round to 2 decimals
    remaining: Math.round(remaining * 100) / 100,
    percentageUsed: Math.round(percentageUsed * 100) / 100
  };
};

/**
 * Check if budget threshold (80%) has been crossed
 * @param {Number} budgetAmount - Monthly budget amount
 * @param {Number} totalSpent - Total amount spent
 * @returns {Boolean} True if threshold crossed
 */
const checkThreshold = (budgetAmount, totalSpent) => {
  if (budgetAmount <= 0) return false;
  
  const threshold = budgetAmount * 0.8;
  return totalSpent >= threshold;
};

/**
 * Get month and year for current date
 * @returns {Object} Current month and year
 */
const getCurrentMonthYear = () => {
  const now = new Date();
  return {
    month: now.getMonth() + 1, // 1-12
    year: now.getFullYear()
  };
};

module.exports = {
  calculateRemaining,
  checkThreshold,
  getCurrentMonthExpenses,
  getCurrentMonthYear
};
