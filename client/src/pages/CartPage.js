// frontend/src/pages/CartPage.js
import React from 'react';
import { useCart } from '../context/CartContext';
import Cart from '../components/Cart';
import { useNavigate } from 'react-router-dom';
import './styles/CartPage.css'

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div>
      <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
      {cartItems.length > 0 && (
        <button className="btn btn-primary mt-4" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default CartPage;
