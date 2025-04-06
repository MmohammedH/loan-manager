import React, { useEffect, useState } from 'react';
import API from '../utils/api';

const AdminPanel = () => {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    API.get('/admin/applications').then(res => setApplications(res.data.applications));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
      {applications.map(app => (
        <div key={app._id} className="border p-2 mb-2">
          <p>User: {app.userId?.email}</p>
          <p>Amount: {app.loanAmount}</p>
          <p>Status: {app.status}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;