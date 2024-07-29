import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Ensure you import the CSS file

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login', { email, password });
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate('/');
      }, 2000); // Adjust the duration as needed
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <p className="info-text">
        If you forgot your password, click <Link to="/forgot-password">ForgotPassword</Link> to reset it.
        <br />
        or
        <br />
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>

      {showToast && (
        <div className="toast show">
          <p>Login successful!</p>
        </div>
      )}
    </div>
  );
};

export default Login;
