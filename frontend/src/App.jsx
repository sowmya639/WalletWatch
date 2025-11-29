import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import SetBudget from './pages/SetBudget';
import AddExpense from './pages/AddExpense';
import AlertsLog from './pages/AlertsLog';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-white text-center mb-8">
              💰 WalletWatch
            </h1>
            
            <Navigation />
            
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/set-budget" element={<SetBudget />} />
              <Route path="/add-expense" element={<AddExpense />} />
              <Route path="/alerts-log" element={<AlertsLog />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
