const express = require('express')
const Cart = require('../models/Cart')

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ items: [] });
    }
    res.json({ items: cart.items });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  if (!productId || !quantity) {
    return res.status(400).json({ error: 'Product ID and quantity are required' });
  }

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
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

const removeFromCart = async (req, res) => {
  console.log('Request body:', req.body)
  const { productId, quantity } = req.body;
  
  // Validate input
  if (!productId || !quantity) {
    return res.status(400).json({ error: 'Product ID and quantity are required' });
  }

  try {
    // Find the cart for the authenticated user
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Find the item to be removed
    const itemIndex = cart.items.findIndex(item => item.product.equals(productId));

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    // Check if the quantity is greater than or equal to the item quantity in the cart
    if (cart.items[itemIndex].quantity <= quantity) {
      // Remove item if quantity is less than or equal
      cart.items.splice(itemIndex, 1);
    } else {
      // Decrease quantity
      cart.items[itemIndex].quantity -= quantity;
    }

    // Save the updated cart
    await cart.save();
    res.json({ items: cart.items });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Server error' });
  }
};




module.exports = {
    getCart,
    addToCart,
    removeFromCart
}