// frontend/src/pages/Home.js
import React from 'react';
import { useCart } from '../context/CartContext';
import ProductList from '../components/ProductList';

const Home = () => {
  const { addToCart } = useCart();

  return (
    <div>
      {/* <h1>Home</h1> */}
      <ProductList addToCart={addToCart} />
    </div>
  );
};

export default Home;
