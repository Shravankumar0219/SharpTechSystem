import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import UserService from '../UserService/UserService';
import AuthContext from '../AuthContext/AuthContext';
import './VerifyLogin.css';

const VerifyLogin = () => {


    const [otp, setOtp] = useState('');
    // const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [transactionid, setTansactionId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Using useNavigate hook

    const { verifylogin } = useContext(AuthContext);

    const location = useLocation();
    const { email } = location.state || {};  // Get the email from state
  
    if (!email) {
      return <p>No email provided. Please go back and enter your email again.</p>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const userData = await UserService.verifylogin(email, otp);
           console.log(userData);
          if (userData.token) {
            verifylogin(userData.token, userData.role, userData.transactionId);
            localStorage.setItem('email', email); // Store email in localStorage
    
    
            // localStorage.setTansactionId('transactionid',userData.transactionId);     // Storing the transaction ID in local Storage
            console.log(transactionid);
            navigate('/DisplayLogin');
          } else {
            setError(userData.message);
            setTimeout(() => {
              setError('');
            }, 5000);
          }
        } catch (error) {
          setError(error.message);
          setTimeout(() => {
            setError('');
          }, 5000);
        }
      };

    return (
        <div className="verify-login-container">
            <div className="verify-login-box">
                <h1>Enter Otp</h1>
                <form onSubmit={handleSubmit}>
                    <div className="verify-login-input-group">
                        <label>OTP:</label>
                        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required/>
                    </div>
                    <button type="submit">Verify Login</button>
                </form>
                {message && <p className="verify-login-sucess-message">{message}</p>}
                {error && <p className="verify-login-error-message">{error}</p>}
            </div>
        </div>
    )
}

export default VerifyLogin
