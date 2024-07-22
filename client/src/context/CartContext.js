// frontend/src/context/CartContext.js
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

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/cart`, getAuthHeaders());
        setCartItems(response.data.items || []);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (product) => {
    try {
      const response = await axios.delete(`${baseUrl}/api/cart/remove`, {
        headers: getAuthHeaders().headers,
        data: { productId: product._id },
      });
      setCartItems(response.data.items || []);
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
