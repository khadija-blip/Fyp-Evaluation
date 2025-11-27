const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('../utils/asyncHandler');

const buildUserPayload = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  department: user.department,
  createdAt: user.createdAt,
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role = 'student', department } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password required' });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    department,
  });

  const token = generateToken(user._id);
  return res.status(201).json({ token, user: buildUserPayload(user) });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user._id);
  return res.json({ token, user: buildUserPayload(user) });
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res.json({ user: buildUserPayload(req.user) });
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};


