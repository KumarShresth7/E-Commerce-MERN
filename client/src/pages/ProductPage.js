import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../baseUrl';

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
    <div>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default ProfilePage;
