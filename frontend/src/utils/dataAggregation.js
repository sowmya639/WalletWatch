/**
 * Data Aggregation Utilities
 * Functions to aggregate and transform expense data for charts
 */

/**
 * Aggregate expenses by month
 * @param {Array} expenses - Array of expense objects
 * @returns {Array} Array of {month, total} objects
 */
export const aggregateByMonth = (expenses) => {
  const monthlyData = {};

  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthKey,
        total: 0,
        count: 0
      };
    }
    
    monthlyData[monthKey].total += expense.amount;
    monthlyData[monthKey].count += 1;
  });

  // Convert to array and sort by month
  return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));
};

/**
 * Aggregate expenses by category
 * @param {Array} expenses - Array of expense objects
 * @returns {Array} Array of {category, total, count} objects
 */
export const aggregateByCategory = (expenses) => {
  const categoryData = {};

  expenses.forEach(expense => {
    const category = expense.category || 'Uncategorized';
    
    if (!categoryData[category]) {
      categoryData[category] = {
        category,
        total: 0,
        count: 0
      };
    }
    
    categoryData[category].total += expense.amount;
    categoryData[category].count += 1;
  });

  // Convert to array and sort by total descending
  return Object.values(categoryData).sort((a, b) => b.total - a.total);
};

/**
 * Get expenses for current month
 * @param {Array} expenses - Array of expense objects
 * @returns {Array} Filtered expenses for current month
 */
export const getCurrentMonthExpenses = (expenses) => {
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
 * Calculate total for a set of expenses
 * @param {Array} expenses - Array of expense objects
 * @returns {Number} Total amount
 */
export const calculateTotal = (expenses) => {
  return expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
};

/**
 * Format month key to readable string
 * @param {String} monthKey - Month key in format YYYY-MM
 * @returns {String} Formatted month string
 */
export const formatMonthKey = (monthKey) => {
  const [year, month] = monthKey.split('-');
  const date = new Date(year, parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

/**
 * Get last N months of data
 * @param {Array} monthlyData - Array of monthly aggregated data
 * @param {Number} n - Number of months to return
 * @returns {Array} Last N months of data
 */
export const getLastNMonths = (monthlyData, n = 6) => {
  return monthlyData.slice(-n);
};
