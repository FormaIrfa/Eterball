const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: 'Username and password are required' });
  }

  const user = await User.findOne({ username: username });
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

module.exports = router;
