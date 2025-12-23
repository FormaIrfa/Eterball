const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const __User__ = require('../models/User');
const SECRET_KEY = process.env.JWT_SECRET;

// ← AJOUTEZ CE MIDDLEWARE
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token expiré ou invalide' });
    }
    req.user = user;
    next();
  });
};

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: 'Username and password are required' });
  }
  const user = await __User__.findOne({ username: username });
  if (!user) {
    return res
      .status(401)
      .json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
  }
  const token = jwt.sign(
    { userId: user._id, username: user.username, email: user.email },
    SECRET_KEY,
    {
      expiresIn: '2h',
    }
  );
  res.status(200).json({
    message: 'Connexion réussis',
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    },
  });
});

router.post('/logout', (req, res) => {
  res.status(200).json({
    message: 'Déconnexion réussie',
  });
});

// ← AJOUTEZ CETTE ROUTE DE TEST
router.get('/test-token', authenticateToken, (req, res) => {
  res.json({
    message: 'Token valide !',
    user: req.user,
  });
});

module.exports = router;
