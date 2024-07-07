import React, { useState } from 'react';
import axios from 'axios';
import { setAuthToken } from '../utils/auth';
import { baseUrl } from '../baseUrl';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/auth/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
