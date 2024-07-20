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
        console.log(response.data.items)
        setCartItems(response.data.items || []);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const addToCart = async (product) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/cart/add`,
        { productId: product._id, quantity: 1 },
        getAuthHeaders()
      );
      setCartItems(response.data.items || []);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const removeFromCart = async (product) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/cart/remove`,
        { productId: product._id },
        getAuthHeaders()
      );
      setCartItems(response.data.items || []);
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
