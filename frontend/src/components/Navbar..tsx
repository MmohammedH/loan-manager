// src/components/Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div>
        <Link to="/dashboard" className="mr-4">Dashboard</Link>
        <Link to="/apply" className="mr-4">Apply</Link>
        <Link to="/admin" className="mr-4">Admin</Link>
        <Link to="/verifier" className="mr-4">Verifier</Link>
      </div>
      <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded">Logout</button>
    </nav>
  );
};

export default Navbar;
