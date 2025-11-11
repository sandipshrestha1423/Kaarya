import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <div className="jumbotron text-center">
        <h1 className="display-4">Dashboard</h1>
        <p className="lead">Welcome to your dashboard.</p>
        <hr className="my-4" />
        <button className="btn btn-danger" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;