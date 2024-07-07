import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {products.map(product => (
        <Product key={product._id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductList;
