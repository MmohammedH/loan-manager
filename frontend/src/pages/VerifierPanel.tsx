import React, { useEffect, useState } from 'react';
import API from '../utils/api';

const VerifierPanel = () => {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    API.get('/application/pending').then(res => setApplications(res.data.applications));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await API.patch(`/application/verify/${id}`, { status });
    setApplications(prev => prev.filter(app => app._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Verifier Panel</h1>
      {applications.map(app => (
        <div key={app._id} className="border p-2 mb-2">
          <p>User: {app.userId?.email}</p>
          <p>Amount: {app.loanAmount}</p>
          <p>Status: {app.status}</p>
          <button onClick={() => updateStatus(app._id, 'verified')} className="bg-blue-500 text-white px-2 py-1 mr-2">Verify</button>
          <button onClick={() => updateStatus(app._id, 'rejected')} className="bg-red-500 text-white px-2 py-1">Reject</button>
        </div>
      ))}
    </div>
  );
};

export default VerifierPanel;