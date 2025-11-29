import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className={`${sizeClasses[size]} border-4 border-white border-opacity-30 border-t-white rounded-full animate-spin`}></div>
      {text && (
        <p className="text-white text-opacity-80 mt-4">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
