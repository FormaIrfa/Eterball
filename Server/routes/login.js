router.post("/login", async (req, res) => {
  try {
    const username = req.body?.username?.trim();
    const password = req.body?.password;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const user = await __User__.findOne({ username });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
    }

    // ✅ vérification email
    if (!user.isVerified) {
      return res.status(403).json({
        error: "Merci de confirmer ton email avant de te connecter.",
      });
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
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      message: "Connexion réussie",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error("Erreur login:", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

const { sendVerificationEmail } = require("../services/emailService");

router.post("/resend-verification", async (req, res) => {
  try {
    const email = req.body?.email?.trim()?.toLowerCase();

    if (!email) {
      return res.status(400).json({ error: "Email requis" });
    }

    const user = await __User__.findOne({ email });

    // ✅ Réponse neutre même si pas trouvé (sécurité)
    if (!user) {
      return res.status(200).json({
        message: "Si un compte existe, un email de confirmation a été renvoyé.",
      });
    }

    // Si déjà vérifié, pas besoin de renvoyer
    if (user.isVerified) {
      return res.status(200).json({
        message: "Ton email est déjà vérifié ✅",
      });
    }

    await sendVerificationEmail({ to: user.email, userId: user._id });

    return res.status(200).json({
      message: "Email de confirmation renvoyé. Vérifie ta boîte mail.",
    });
  } catch (err) {
    console.error("Erreur resend-verification:", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});
