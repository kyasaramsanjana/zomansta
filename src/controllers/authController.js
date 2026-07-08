const asyncHandler = require('../utils/asyncHandler');
const { registerUser, loginUser } = require('../services/authService');

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  const user = await registerUser(name, email, password);

  res.status(201).json({
    success: true,
    data: user
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  const user = await loginUser(email, password);

  res.status(200).json({
    success: true,
    data: user
  });
});

module.exports = { register, login };
