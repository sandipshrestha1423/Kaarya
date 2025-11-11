import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="container mt-5">
    <div className="jumbotron text-center">
      <h1 className="display-4">Welcome to Kaarya</h1>
      <p className="lead">Your personal task manager.</p>
      <hr className="my-4" />
      <p>Please login or register to continue.</p>
      <Link className="btn btn-primary btn-lg" to="/login" role="button">Login</Link>
      <Link className="btn btn-secondary btn-lg ms-2" to="/register" role="button">Register</Link>
    </div>
  </div>
);

export default Home;