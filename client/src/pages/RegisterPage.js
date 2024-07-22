// frontend/src/pages/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { setAuthToken } from '../utils/auth';
import { baseUrl } from '../baseUrl';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/auth/register`, { name, email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      navigate('/home');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div className="mb-3">
        <label>Name:</label>
        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label>Email:</label>
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label>Password:</label>
        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit" className="btn btn-primary w-100">Register</button>
    </form>
  );
};

export default RegisterPage;
