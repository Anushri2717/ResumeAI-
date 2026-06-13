const jwt = require('jsonwebtoken');
const User = require('../models/User');
 
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
 
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    const user = await User.create({ name, email, password });
    res.status(201).json({ user, token: generateToken(user._id) });
  } catch (error) { next(error); }
};
 
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid email or password' });
    res.json({ user, token: generateToken(user._id) });
  } catch (error) { next(error); }
};
 
const getProfile = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) { next(error); }
};
 
module.exports = { register, login, getProfile };