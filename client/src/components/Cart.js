import React from 'react';
import { useCart } from '../context/CartContext';
import './styles/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const handleRemove = (item) => {
    console.log('Removing item:', item); // Log item to be removed
    removeFromCart(item.product._id, 1);
  };

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
          <div key={item.product._id} className="cart-item card mb-3 shadow-sm">
            <div className="card-body">
              <h3 className="card-title">{item.product.name}</h3>
              <p className="card-text">₹{item.product.price}</p>
              <p className="card-text">Quantity: {item.quantity}</p>
              <button className="btn btn-danger" onClick={() => handleRemove(item)}>Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
