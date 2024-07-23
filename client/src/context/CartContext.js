import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../baseUrl';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/cart`, getAuthHeaders());
      setCartItems(response.data.items || []);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const addToCart = async (productId, quantity) => {
    // console.log('Adding to cart:', productId);
    // console.log('Quantity', quantity)
    try {
      const response = await axios.post(
        `${baseUrl}/api/cart/add`,
        { productId, quantity },
        getAuthHeaders()
      );
      fetchCartItems();
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const removeFromCart = async (productId, quantity) => {
    try {
      const response = await axios.post(`${baseUrl}/api/cart/remove`, { productId, quantity }, getAuthHeaders());
      fetchCartItems();
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, fetchCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
