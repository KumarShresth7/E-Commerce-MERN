const express = require('express');
const Stripe = require('stripe');
const dotenv = require('dotenv')
dotenv.config

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

const payment = async(req,res)=>{
    const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.json(paymentIntent.client_secret);
  } catch (error) {
    res.status(500).json({ error: 'Payment creation failed' });
  }
}

module.exports = {payment}