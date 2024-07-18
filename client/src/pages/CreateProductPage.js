import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../baseUrl';

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
    <div>
      <h1>Add Product</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default CreateProductPage;
