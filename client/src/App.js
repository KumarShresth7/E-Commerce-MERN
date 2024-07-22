// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage'; // Import CheckoutPage
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CreateProductPage from './pages/CreateProductPage';
import { CartProvider } from './context/CartContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PehJtRrfwW2nFTQFma7DnbLR0RJiGVTgO74xNZ6D98NdMJPs2vgpHpi5AL4A4PjGufTjUibhvvFICSOPBmW76Ok00rNHz2eN9');

const App = () => {
  return (
    <Router>
      <Navbar />
      <CartProvider>
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} /> {/* Add CheckoutPage route */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create-product" element={<CreateProductPage />} />
          </Routes>
        </Elements>
      </CartProvider>
    </Router>
  );
};

export default App;
