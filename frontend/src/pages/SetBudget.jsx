import React, { useState, useEffect } from 'react';
import api from '../config/api';
import Card from '../components/Card';

const SetBudget = () => {
  const [amount, setAmount] = useState('');
  const [currentBudget, setCurrentBudget] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingBudget, setFetchingBudget] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchCurrentBudget();
  }, []);

  const fetchCurrentBudget = async () => {
    try {
      const response = await api.get('/api/budget');
      if (response.data.success && response.data.data.budget) {
        setCurrentBudget(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch budget:', error);
    } finally {
      setFetchingBudget(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!amount) {
      setMessage({ type: 'error', text: 'Budget amount is required' });
      return;
    }

    if (parseFloat(amount) <= 0) {
      setMessage({ type: 'error', text: 'Budget amount must be greater than 0' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await api.post('/api/budget', {
        amount: parseFloat(amount)
      });

      if (response.data.success) {
        setMessage({ type: 'success', text: response.data.message });
        setCurrentBudget(response.data.data);
        setAmount('');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to set budget';
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Set Monthly Budget</h1>
      
      {/* Current Budget Display */}
      {!fetchingBudget && currentBudget && currentBudget.budget && (
        <Card>
          <h2 className="text-xl font-semibold text-white mb-4">Current Budget</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-white text-opacity-70 text-sm">Monthly Budget</p>
              <p className="text-2xl font-bold text-white">
                ${currentBudget.budgetAmount?.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-white text-opacity-70 text-sm">Total Spent</p>
              <p className="text-2xl font-bold text-white">
                ${currentBudget.totalSpent?.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-white text-opacity-70 text-sm">Remaining</p>
              <p className={`text-2xl font-bold ${
                currentBudget.remaining >= 0 ? 'text-green-300' : 'text-red-300'
              }`}>
                ${currentBudget.remaining?.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-white text-opacity-70 text-sm">Used</p>
              <p className="text-2xl font-bold text-white">
                {currentBudget.percentageUsed?.toFixed(1)}%
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Set Budget Form */}
      <Card>
        <h2 className="text-xl font-semibold text-white mb-4">
          {currentBudget?.budget ? 'Update Budget' : 'Set New Budget'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-white font-medium mb-2">
              Monthly Budget Amount *
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (message.text) setMessage({ type: '', text: '' });
              }}
              step="0.01"
              min="0.01"
              placeholder="Enter budget amount"
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-50 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              required
            />
          </div>

          {/* Message */}
          {message.text && (
            <div className={`p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-500 bg-opacity-20 border border-green-500' 
                : 'bg-red-500 bg-opacity-20 border border-red-500'
            }`}>
              <p className="text-white">{message.text}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-white border-opacity-30"
          >
            {loading ? 'Saving...' : currentBudget?.budget ? 'Update Budget' : 'Set Budget'}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default SetBudget;
