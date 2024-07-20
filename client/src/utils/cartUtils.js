import axios from 'axios';
import { baseUrl } from '../baseUrl';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const addToCart = async (product, quantity, setCartItems) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/cart/add`,
      { productId: product._id, quantity },
      getAuthHeaders()
    );
    setCartItems(response.data.items || []);
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

export const removeFromCart = async (productId, setCartItems) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/cart/remove`,
      { productId },
      getAuthHeaders()
    );
    setCartItems(response.data.items || []);
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
};

export const fetchCartItems = async (setCartItems) => {
  try {
    const response = await axios.get(`${baseUrl}/api/cart`, getAuthHeaders());
    setCartItems(response.data.items || []);
  } catch (error) {
    console.error('Failed to fetch cart items:', error);
  }
};
