import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/set-budget', label: 'Set Budget', icon: '💵' },
    { path: '/add-expense', label: 'Add Expense', icon: '➕' },
    { path: '/alerts-log', label: 'Alerts Log', icon: '🔔' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass-card mb-8">
      <div className="px-4 py-3">
        {/* Mobile menu button */}
        <div className="flex justify-between items-center md:hidden">
          <span className="text-white font-semibold">Menu</span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-white bg-opacity-20 text-white font-semibold'
                  : 'text-white text-opacity-80 hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-white bg-opacity-20 text-white font-semibold'
                    : 'text-white text-opacity-80 hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
