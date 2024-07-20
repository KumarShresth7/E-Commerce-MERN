// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import { setAuthToken, getCurrentUser } from './utils/auth';
import { jwtDecode } from 'jwt-decode';
import CreateProductPage from './pages/CreateProductPage';
import { CartProvider } from './context/CartContext';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = getCurrentUser();
    if (token) {
      setAuthToken(token);
      const decoded = jwtDecode(token);
      setCurrentUser(decoded);
    }
  }, []);

  return (
    <Router>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-product" element={<CreateProductPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
};

export default App;
