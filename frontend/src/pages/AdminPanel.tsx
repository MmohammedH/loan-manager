import React, { useEffect, useState } from 'react';
import API from '../utils/api';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const AdminPanel = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    API.get('/admin/applications').then(res => {
      setApplications(res.data.applications);

      // Calculate stats for chart
      const counts = res.data.applications.reduce((acc: any, app: any) => {
        acc[app.status] = (acc[app.status] || 0) + 1;
        return acc;
      }, {});

      const chartData = Object.keys(counts).map(status => ({
        name: status,
        count: counts[status]
      }));
      setStats(chartData);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Application Analytics</h2>
        <BarChart width={600} height={300} data={stats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>

      <h2 className="text-lg font-semibold mb-2">Recent Applications</h2>
      {applications.map(app => (
        <div key={app._id} className="border p-2 mb-2">
          <p>User: {app.userId?.email}</p>
          <p>Amount: ${app.loanAmount}</p>
          <p>Status: {app.status}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;