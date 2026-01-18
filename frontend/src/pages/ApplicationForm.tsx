import React, { useState } from 'react';
import API from '../utils/api';

const ApplicationForm = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');

  const submitApplication = async () => {
    try {
      await API.post('/application/submit', { loanAmount, monthlyIncome });
      alert('Application submitted');
    } catch (error) {
      alert('Submission failed');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Loan Application</h1>
      <input type="number" placeholder="Loan Amount" className="p-2 border mb-4 block w-full" onChange={(e) => setLoanAmount(e.target.value)} />
      <input type="number" placeholder="Monthly Income" className="p-2 border mb-4 block w-full" onChange={(e) => setMonthlyIncome(e.target.value)} />
      <button className="bg-green-600 text-white px-4 py-2" onClick={submitApplication}>Submit</button>
    </div>
  );
};

export default ApplicationForm;