const jwt = require('jsonwebtoken');
const config = require('../config');
const { User } = require('../models/User');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    
    // Get user from database
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(403).json({ message: 'Invalid token' });
  }
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, config.JWT_SECRET, { 
    expiresIn: config.JWT_EXPIRES_IN 
  });
};

module.exports = {
  authenticateToken,
  generateToken
}; 