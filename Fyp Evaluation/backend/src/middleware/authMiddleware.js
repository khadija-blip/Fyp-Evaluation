const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect =
  (roles = []) =>
  async (req, res, next) => {
    try {
      const allowedRoles = typeof roles === 'string' ? [roles] : roles;

      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
      ) {
        [, token] = req.headers.authorization.split(' ');
      } else if (req.cookies?.token) {
        token = req.cookies.token;
      }

      if (!token) {
        return res.status(401).json({ message: 'Not authorized, token missing' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({ message: 'User no longer exists' });
      }

      if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user.role)
      ) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }

      req.user = user;
      return next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: 'Not authorized' });
    }
  };

module.exports = { protect };


