const express = require('express')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const User = require('../models/User')
const dotenv = require('dotenv')
dotenv.config()

const registerUser = async(req,res) =>{
    const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ id: user._id },process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
}

const loginUser = async(req,res)=>{
    const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id },process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

const getProfile = async(req,res)=>{
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send('User not found');
    res.send(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
}

module.exports = {
    registerUser,
    loginUser,
    getProfile
}


