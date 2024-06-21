import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import LoginNavbar from '../LoginNavbar/LoginNavbar';
import Footer from '../../components/Footer/Footer';
import AuthContext from '../AuthContext/AuthContext';
import UserService from '../UserService/UserService';
import L_1 from '../../assets/login_image_6.jpg'
import { MdEmail } from 'react-icons/md'; // Importing MdEmail icon
import { FaLinkedin, FaInstagram, FaEnvelope, } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  // const [transactionid, setTansactionId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await UserService.login(email, password);
       console.log(response);
      if (response.statusCode==200) {
        // login(userData.token, userData.role, userData.transactionId);
        localStorage.setItem('email', email); // Store email in localStorage
        alert(response.message);


        // localStorage.setTansactionId('transactionid',userData.transactionId);     // Storing the transaction ID in local Storage
        // console.log(transactionid);
        navigate('/VerifyLogin',{ state: { email } });  // Pass email in state
      } else {
        setError(response.message);
        setTimeout(() => {
          setError('');
        }, 3500);
      }
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div>
      <LoginNavbar />
      <div className='login-page-container'>

        <div className='login-image'>
          <img src={L_1} alt="" />
        </div>

        <form className='login-form' onSubmit={handleSubmit}>

          <div className='login-heading-container'>
            <h1>Welcome to Sharp Tech Systems</h1> <br />
            <p>Please login with below details to access your account. </p>
          </div>
          {error && <p className="error-message">{error}</p>}

          <div className='input-group'>
            <label >Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className='input-group'>
            <label >Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button className='login-button' type="submit">Login</button>

          <br />

          <Link to="/ForgetPassword" className='forgot-password'>Forgot Password?</Link>
       
        </form>
      </div>
      <Footer/>
    </div>


  );
};

export default Login;