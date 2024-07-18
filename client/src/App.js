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
// import ProductPage from './pages/ProductPage';
import CreateProductPage from './pages/CreateProductPage';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = getCurrentUser();
    if (token) {
      setAuthToken(token);
      const decoded = jwtDecode(token);
      setCurrentUser(decoded);
    }
  }, []);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (product) => {
    setCartItems(cartItems.filter(item => item._id !== product._id));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create-product" element={<CreateProductPage />}/>
      </Routes>
    </Router>
  );
};

export default App;
