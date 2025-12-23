// middleware/auth.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      // Le token est expiré ou invalide
      return res.status(403).json({ error: 'Token expiré ou invalide' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
