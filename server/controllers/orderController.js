const express = require('express');
const Order = require('../models/Order');

const newOrder = async(req,res)=>{
    const { orderItems, totalPrice } = req.body;

  try {
    const order = new Order({
      user: req.user.id,
      orderItems,
      totalPrice,
      isPaid: false,
    });
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

const getOrder = async(req,res)=>{
    try {
        const orders = await Order.find({ user: req.user.id });
        res.json(orders);
      } catch (err) {
        res.status(500).json({ error: 'Server error' });
      }
}

module.exports = {
    newOrder,
    getOrder
}