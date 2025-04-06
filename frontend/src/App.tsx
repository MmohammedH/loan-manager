import React, { ReactElement, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import AdminPanel from './pages/AdminPanel';
import VerifierPanel from './pages/VerifierPanel';

function App(): ReactElement {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/apply" element={<ApplicationForm />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/verifier" element={<VerifierPanel />} />
      </Routes>
    </Router>
  );
};

export default App;