import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product';
import { baseUrl } from '../baseUrl';
import './styles/ProductList.css';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/api/products`)
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {products.map(product => (
          <div key={product._id} className="col-md-4 mb-4">
            <Product product={product} addToCart={addToCart} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
