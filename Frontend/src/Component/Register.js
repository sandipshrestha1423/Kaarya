import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { name, email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setError(data.msg);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Sign Up</h1>
              <p className="card-text text-center">Create Your Account</p>
              <form onSubmit={onSubmit}>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={onChange}
                    minLength="6"
                    required
                  />
                </div>
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <button type="submit" className="btn btn-primary w-100">
                    Register
                  </button>
                )}
                {error && <p className="text-danger mt-3 text-center">{error}</p>}
              </form>
              <p className="mt-3 text-center">
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;