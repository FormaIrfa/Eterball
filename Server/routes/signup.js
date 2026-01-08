const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User.js');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

router.post('/signup', async (req, res) => {
  const { username, surname, email, password, birthDate } = req.body;

  if (!username || !surname || !email || !password || !birthDate) {
    return res.status(400).json({
      error:
        'Nom, prénom, email, mot de passe et date de naissance sont requis',
    });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Utilisateur déjà existant' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      surname,
      email,
      password: hashedPassword,
      birthDate: new Date(birthDate),
      isVerified: false,
    });

    await newUser.save();

    // ✅ Token email (différent du token de login)
    const emailToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_EMAIL_SECRET,
      { expiresIn: '24h' }
    );

    const verifyUrl = `${
      process.env.CLIENT_URL
    }/verify?token=${encodeURIComponent(emailToken)}`;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: newUser.email,
      subject: 'Confirme ton compte Eterball',
      html: `
        <div style="font-family:Arial,sans-serif">
          <h2>Bienvenue sur Eterball 👋</h2>
          <p>Merci pour ton inscription. Clique sur le bouton ci-dessous pour confirmer ton email :</p>
          <p>
            <a href="${verifyUrl}"
               style="display:inline-block;padding:10px 16px;border-radius:8px;background:#22c55e;color:#fff;text-decoration:none;">
              Confirmer mon compte
            </a>
          </p>
          <p>Ce lien expire dans 24h.</p>
        </div>
      `,
    });

    return res.status(201).json({
      message: 'Utilisateur créé. Un email de confirmation a été envoyé.',
    });
  } catch (err) {
    console.error('Erreur signup:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
