import React from 'react';

const Cart = ({ cartItems, removeFromCart }) => {
  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart</p> : (
        cartItems.map(item => (
          <div key={item._id}>
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
