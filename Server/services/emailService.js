const { Resend } = require("resend");
const jwt = require("jsonwebtoken");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendVerificationEmail({ to, userId }) {
  const emailToken = jwt.sign({ userId }, process.env.JWT_EMAIL_SECRET, {
    expiresIn: "24h",
  });

  const verifyUrl = `${
    process.env.CLIENT_URL
  }/verify?token=${encodeURIComponent(emailToken)}`;

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "Eterball <onboarding@resend.dev>",
    to,
    subject: "Confirme ton compte Eterball",
    html: `
      <div style="font-family:Arial,sans-serif">
        <h2>Confirme ton compte Eterball 👋</h2>
        <p>Clique sur le bouton ci-dessous pour confirmer ton email :</p>
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
}

module.exports = { sendVerificationEmail };
