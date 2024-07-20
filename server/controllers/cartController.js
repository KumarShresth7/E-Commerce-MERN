const express = require('express')
const Cart = require('../models/Cart')

const getCart = async(req,res)=>{
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart.items);
      } catch (error) {
        console.error('Failed to fetch user cart items:', error);
        res.status(500).json({ error: 'Server error' });
      }
}

const addToCart = async(req,res)=>{
    try {
        let cart = await Cart.findOne({ user: req.user.id });
    
        if (!cart) {
          cart = new Cart({ user: req.user.id, items: [] });
        }

        const existingItem = cart.items.find(item => item.product.equals(productId));

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.items.push({ product: productId, quantity });
        }
        await cart.save();
        res.json(cart);
      } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Server error' });
      }
}

const deleteFromCart = async()=>{
    const { productId } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    cart.items = cart.items.filter(item => !item.product.equals(productId));
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
    getCart,
    addToCart,
    deleteFromCart
}