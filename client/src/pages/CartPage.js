// frontend/src/pages/CartPage.js
import React from 'react';
import { useCart } from '../context/CartContext';
import Cart from '../components/Cart';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div>
      {/* <h1>Cart Page</h1> */}
      <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
    </div>
  );
};

export default CartPage;
