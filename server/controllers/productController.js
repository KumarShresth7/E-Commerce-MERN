const express = require('express');
const Product = require('../models/Product');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const addProducts = async (req, res) => {
    const { name, description, price, imageUrl } = req.body;

    try {
        const product = new Product({ name, description, price, imageUrl });
        await product.save();
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getProducts,
    addProducts,
};
