import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import './styles/CreateProductPage.css';

const CreateProductPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name,
      description,
      price,
      imageUrl,
    };

    try {
      await axios.post(`${baseUrl}/api/products`, productData);
      setMessage('Product added successfully!');
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
    } catch (error) {
      console.error('Failed to add product:', error);
      setMessage('Failed to add product.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Add Product</h1>
      {message && <p className="text-center message">{message}</p>}
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
