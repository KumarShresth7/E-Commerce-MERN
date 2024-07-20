// frontend/src/components/Cart.js

import React from 'react';
import './styles/Cart.css';

const Cart = ({ cartItems, removeFromCart }) => {
  console.log('cartItems:', cartItems); // Log for debugging
  console.log('Type of cartItems:', typeof cartItems); // Log for debugging

  if (!Array.isArray(cartItems)) {
    return (
      <div className="cart-container container mt-5">
        <h2 className="cart-title">Cart</h2>
        <p>Unexpected error: cartItems is not an array</p>
      </div>
    );
  }

  return (
    <div className="cart-container container mt-5">
      <h2 className="cart-title">Cart</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty">No items in cart</p>
      ) : (
        cartItems.map(item => (
          <div key={item._id} className="cart-item card mb-3 shadow-sm">
            <div className="card-body">
              <h3 className="card-title">{item.product.name}</h3>
              <p className="card-text">₹{item.product.price}</p>
              <p className="card-text">Quantity: {item.quantity}</p>
              <button className="btn btn-danger" onClick={() => removeFromCart(item)}>Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
