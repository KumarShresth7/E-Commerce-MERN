import React from 'react';
import './styles/Product.css';

const Product = ({ product, addToCart }) => {
  return (
    <div className="product-card card shadow-sm">
      <img src={product.imageUrl} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-text">{product.description}</p>
        <p className="product-price">₹{product.price}</p>
        <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;
