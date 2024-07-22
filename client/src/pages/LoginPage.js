// frontend/src/pages/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { setAuthToken } from '../utils/auth';
import { baseUrl } from '../baseUrl';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/LoginPage.css'

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/auth/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="mb-3">
        <label>Email:</label>
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label>Password:</label>
        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit" className="btn btn-primary w-100">Login</button>
    </form>
  );
};

export default LoginPage;
