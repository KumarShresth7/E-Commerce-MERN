// frontend/src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/auth/profile`);
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="container profile-container">
      <div className="profile-header">
        <h1 className="display-4">Profile</h1>
      </div>
      <div className="profile-details">
        <p className="lead">
          <label>Name:</label>
          <span>{user.name}</span>
        </p>
        <p className="lead">
          <label>Email:</label>
          <span>{user.email}</span>
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
