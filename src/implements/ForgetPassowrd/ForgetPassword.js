import React, { useState } from 'react';
import axios from 'axios';
import './ForgetPassword.css';
import { useNavigate } from 'react-router-dom';

// Define the FloatLabel component within the same file
const FloatLabel = ({ children, label, value }) => {
  const isActive = value && value.length > 0;
  return (
    <div className={`float-label ${isActive ? 'active' : ''}`}>
      {children}
      <label className="float-label-text">{label}</label>
    </div>
  );
};

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/forgot-password', { email });
      setMessage(response.data.message);
      setError('');
      window.alert(response.data.message);
      navigate('/ResetPassword', { state: { email } });  // Pass email in state
    } catch (err) {
      setMessage('');
      setError(err.response.data.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h1 className="forgot-password-heading">Forgot Password</h1>
        <p>Enter your email address, and we will send an OTP which you can use to reset your password.</p>
        <br/>
        <form onSubmit={handleSubmit}>
          <FloatLabel label="Email" value={email}>
            <input
            // placeholder='email@gmail.com'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FloatLabel>
          <br/>
          <button type="submit">Get OTP</button>
        </form>
        {message && <p className="forget-success-message">{message}</p>}
        {error && <p className="forget-error-message">{error}</p>}
      </div>
    </div>
  );
};

export default ForgetPassword;
