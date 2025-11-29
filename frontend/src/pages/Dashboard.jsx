import React, { useState, useEffect } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import api from '../config/api';
import Card from '../components/Card';
import {
  aggregateByMonth,
  aggregateByCategory,
  getCurrentMonthExpenses,
  calculateTotal,
  formatMonthKey,
  getLastNMonths
} from '../utils/dataAggregation';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [expensesRes, budgetRes] = await Promise.all([
        api.get('/api/expenses'),
        api.get('/api/budget')
      ]);

      if (expensesRes.data.success) {
        setExpenses(expensesRes.data.data);
      }

      if (budgetRes.data.success) {
        setBudget(budgetRes.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate current month data
  const currentMonthExpenses = getCurrentMonthExpenses(expenses);
  const currentMonthTotal = calculateTotal(currentMonthExpenses);

  // Aggregate data for charts
  const monthlyData = getLastNMonths(aggregateByMonth(expenses), 6);
  const categoryData = aggregateByCategory(currentMonthExpenses);

  // Chart configurations
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'white'
        }
      }
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      y: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  };

  // Monthly spending trend data
  const trendData = {
    labels: monthlyData.map(d => formatMonthKey(d.month)),
    datasets: [{
      label: 'Monthly Spending',
      data: monthlyData.map(d => d.total),
      borderColor: 'rgb(147, 197, 253)',
      backgroundColor: 'rgba(147, 197, 253, 0.2)',
      tension: 0.4
    }]
  };

  // Category breakdown data
  const categoryChartData = {
    labels: categoryData.map(d => d.category),
    datasets: [{
      data: categoryData.map(d => d.total),
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(199, 199, 199, 0.8)',
        'rgba(83, 102, 255, 0.8)',
        'rgba(255, 99, 255, 0.8)'
      ]
    }]
  };

  // Budget vs Actual data
  const budgetComparisonData = {
    labels: ['Budget vs Actual'],
    datasets: [
      {
        label: 'Budget',
        data: [budget?.budgetAmount || 0],
        backgroundColor: 'rgba(75, 192, 192, 0.8)'
      },
      {
        label: 'Spent',
        data: [currentMonthTotal],
        backgroundColor: currentMonthTotal > (budget?.budgetAmount || 0) 
          ? 'rgba(255, 99, 132, 0.8)' 
          : 'rgba(54, 162, 235, 0.8)'
      }
    ]
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <Card>
          <p className="text-white text-center">Loading...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <p className="text-white text-opacity-70 text-sm">Monthly Budget</p>
          <p className="text-2xl font-bold text-white">
            ${budget?.budgetAmount?.toFixed(2) || '0.00'}
          </p>
        </Card>
        <Card>
          <p className="text-white text-opacity-70 text-sm">Total Spent</p>
          <p className="text-2xl font-bold text-white">
            ${currentMonthTotal.toFixed(2)}
          </p>
        </Card>
        <Card>
          <p className="text-white text-opacity-70 text-sm">Remaining</p>
          <p className={`text-2xl font-bold ${
            (budget?.remaining || 0) >= 0 ? 'text-green-300' : 'text-red-300'
          }`}>
            ${budget?.remaining?.toFixed(2) || '0.00'}
          </p>
        </Card>
        <Card>
          <p className="text-white text-opacity-70 text-sm">Budget Used</p>
          <p className="text-2xl font-bold text-white">
            {budget?.percentageUsed?.toFixed(1) || '0.0'}%
          </p>
        </Card>
      </div>

      {/* Charts */}
      {expenses.length > 0 ? (
        <>
          {/* Monthly Spending Trend */}
          <Card>
            <h2 className="text-xl font-semibold text-white mb-4">
              Monthly Spending Trend
            </h2>
            <div style={{ height: '300px' }}>
              <Line data={trendData} options={chartOptions} />
            </div>
          </Card>

          {/* Category Breakdown and Budget Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <h2 className="text-xl font-semibold text-white mb-4">
                Category Breakdown (This Month)
              </h2>
              {categoryData.length > 0 ? (
                <div style={{ height: '300px' }}>
                  <Pie 
                    data={categoryChartData} 
                    options={{
                      ...chartOptions,
                      scales: undefined,
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: { color: 'white', padding: 10 }
                        }
                      }
                    }} 
                  />
                </div>
              ) : (
                <p className="text-white text-opacity-70 text-center py-8">
                  No expenses this month
                </p>
              )}
            </Card>

            <Card>
              <h2 className="text-xl font-semibold text-white mb-4">
                Budget vs Actual
              </h2>
              <div style={{ height: '300px' }}>
                <Bar data={budgetComparisonData} options={chartOptions} />
              </div>
            </Card>
          </div>
        </>
      ) : (
        <Card>
          <p className="text-white text-center py-8">
            No expense data available. Start by adding your first expense!
          </p>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
