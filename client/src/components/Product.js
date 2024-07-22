// frontend/src/components/Product.js
import React from 'react';
import './styles/Product.css';

const Product = ({ product, addToCart }) => {
  return (
    <div className="product-card card shadow-sm">
      <img src={product.imageUrl} alt={product.name} className="card-img-top product-image"/>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">₹{product.price}</p>
        <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;
