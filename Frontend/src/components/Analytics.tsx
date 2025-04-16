import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { hour: '00:00', incidents: 2 },
  { hour: '03:00', incidents: 1 },
  { hour: '06:00', incidents: 4 },
  { hour: '09:00', incidents: 7 },
  { hour: '12:00', incidents: 5 },
  { hour: '15:00', incidents: 6 },
  { hour: '18:00', incidents: 8 },
  { hour: '21:00', incidents: 3 },
];

const Analytics = () => {
  return (
    <div className="flex-1 p-8 ml-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Incidents by Hour</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis 
                    dataKey="hour" 
                    className="text-gray-600 dark:text-gray-400"
                  />
                  <YAxis 
                    className="text-gray-600 dark:text-gray-400"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgb(31 41 55)', 
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: 'white'
                    }}
                  />
                  <Bar 
                    dataKey="incidents" 
                    fill="#059669" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;