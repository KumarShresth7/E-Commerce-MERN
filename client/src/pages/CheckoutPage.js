import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import './styles/Checkout.css';

// Load your Stripe public key here
loadStripe('pk_test_51PehJtRrfwW2nFTQFma7DnbLR0RJiGVTgO74xNZ6D98NdMJPs2vgpHpi5AL4A4PjGufTjUibhvvFICSOPBmW76Ok00rNHz2eN9');

const CheckoutPage = () => {
  const { cartItems,setCartItems } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartItems]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (stripeError) {
      setError(stripeError.message);
      return;
    }

    try {
      const { data: clientSecret } = await axios.post(`${baseUrl}/api/payment-intent`, { amount: totalPrice * 100 });
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (error) {
        setError(error.message);
      } else {
        await axios.post(`${baseUrl}/api/orders`, { orderItems: cartItems, totalPrice });
        setSuccess(true);
        // Clear cart or redirect user
      }
    } catch (error) {
      setError('Failed to place the order.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="checkout-wrapper">
        <h2 className="checkout-title">Checkout</h2>
        {success ? (
          <div className="order-success">
            <p>Order placed successfully!</p>
          </div>
        ) : (
          <>
            <div className="cart-summary">
              <h3>Cart Summary</h3>
              {cartItems.map(item => (
                <div key={item._id} className="cart-item">
                  <p>{item.product.name} x {item.quantity} - ₹{item.product.price * item.quantity}</p>
                </div>
              ))}
              <h4>Total Price: ₹{totalPrice}</h4>
            </div>
            <form onSubmit={handleSubmit} className="payment-form">
              <div className="form-group">
                <label htmlFor="card-element">Credit or Debit Card</label>
                <div className="card-element-wrapper">
                  <CardElement id="card-element" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-3" disabled={!stripe}>Pay</button>
              {error && <p className="text-danger mt-3">{error}</p>}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
