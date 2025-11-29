import React, { useState, useEffect } from 'react';
import api from '../config/api';
import Card from '../components/Card';

const AlertsLog = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await api.get('/api/alerts/logs');
      if (response.data.success) {
        setAlerts(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const styles = {
      sent: 'bg-green-500 bg-opacity-20 border-green-500 text-green-300',
      failed: 'bg-red-500 bg-opacity-20 border-red-500 text-red-300',
      pending: 'bg-yellow-500 bg-opacity-20 border-yellow-500 text-yellow-300'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles.pending}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Alerts Log</h1>
        <Card>
          <p className="text-white text-center">Loading alerts...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Alerts Log</h1>

      {alerts.length > 0 ? (
        <Card>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white border-opacity-20">
                  <th className="text-left text-white font-semibold py-3 px-4">Date & Time</th>
                  <th className="text-left text-white font-semibold py-3 px-4">Message</th>
                  <th className="text-left text-white font-semibold py-3 px-4">Budget</th>
                  <th className="text-left text-white font-semibold py-3 px-4">Spent</th>
                  <th className="text-left text-white font-semibold py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert) => (
                  <tr 
                    key={alert._id} 
                    className="border-b border-white border-opacity-10 hover:bg-white hover:bg-opacity-5 transition-colors"
                  >
                    <td className="py-3 px-4 text-white text-opacity-90">
                      {formatDate(alert.timestamp)}
                    </td>
                    <td className="py-3 px-4 text-white text-opacity-90">
                      {alert.message}
                    </td>
                    <td className="py-3 px-4 text-white text-opacity-90">
                      ${alert.budgetAmount?.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-white text-opacity-90">
                      ${alert.spentAmount?.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(alert.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {alerts.map((alert) => (
              <div 
                key={alert._id}
                className="p-4 rounded-lg bg-white bg-opacity-5 border border-white border-opacity-10"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-white text-opacity-70 text-sm">
                    {formatDate(alert.timestamp)}
                  </span>
                  {getStatusBadge(alert.status)}
                </div>
                <p className="text-white mb-3">{alert.message}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-white text-opacity-70">Budget:</span>
                    <span className="text-white ml-2">${alert.budgetAmount?.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-white text-opacity-70">Spent:</span>
                    <span className="text-white ml-2">${alert.spentAmount?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <Card>
          <div className="text-center py-8">
            <p className="text-white text-lg mb-2">No alerts yet</p>
            <p className="text-white text-opacity-70">
              Alerts will appear here when you reach 80% of your monthly budget
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AlertsLog;
