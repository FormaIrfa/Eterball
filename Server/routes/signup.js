const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // si tu veux générer un token
const User = require('../models/User.js');

router.post('/signup', async (req, res) => {
  const { username, surname, email, password, birthDate } = req.body;

  if (!username || !surname || !email || !password || !birthDate) {
    return res.status(400).json({
      error:
        'Nom, prénom, email, mot de passe et date de naissance sont requis',
    });
  }

  try {
    // Vérifie si email déjà utilisé
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Utilisateur déjà existant' });
    }

    // Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Création de l’utilisateur
    const newUser = new User({
      username, // prénom
      surname, // nom
      email,
      password: hashedPassword,
      birthDate: new Date(birthDate), // on stocke une vraie Date
    });

    await newUser.save();

    // Génération du token JWT direct à l'inscription (optionnel)
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        surname: newUser.surname,
        email: newUser.email,
        birthDate: newUser.birthDate,
        createdAt: newUser.createdAt,
      },
    });
  } catch (err) {
    console.error('Erreur signup:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
