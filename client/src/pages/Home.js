import React, { useState } from 'react';
import ProductList from '../components/ProductList';

const Home = ({ addToCart }) => {
  return (
    <div>
      <h1>Home</h1>
      <ProductList addToCart={addToCart} />
    </div>
  );
};

export default Home;
