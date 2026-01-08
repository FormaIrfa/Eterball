"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import "./login.scss";
import { login } from "../store/auth/authSlice";
import { RootState } from "../store/auth";
import { API_ORIGIN } from "@/services/apiOrigin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ✅ pour renvoyer l’email si compte non vérifié
  const [emailForResend, setEmailForResend] = useState("");
  const [needsVerification, setNeedsVerification] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const isConnected = useSelector((store: RootState) => store.auth.isConnected);

  useEffect(() => {
    if (isConnected) router.replace("/");
  }, [isConnected, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setResendStatus(null);
    setNeedsVerification(false);

    if (!username || !password) {
      alert("Merci de remplir tous les champs!");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_ORIGIN}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      // ✅ cas email non vérifié
      if (response.status === 403) {
        const err = await response.json().catch(() => ({}));
        setNeedsVerification(true);
        alert(
          err?.error || "Merci de confirmer ton email avant de te connecter."
        );
        return;
      }

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        alert(err?.error || "Erreur lors de la connexion");
        return;
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      dispatch(
        login({
          token: data.token,
          user: {
            id: data.user.id,
            name: data.user.username,
            avatar: "/assets/Coupe_Casquette.png",
            eter: data.user.eter ?? 0,
          },
        })
      );

      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendStatus(null);

    if (!emailForResend) {
      alert("Entre ton email pour renvoyer l'email de confirmation.");
      return;
    }

    try {
      const res = await fetch(`${API_ORIGIN}/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailForResend }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setResendStatus(data?.error || "Erreur lors du renvoi.");
        return;
      }

      setResendStatus(
        data?.message || "Si un compte existe, un email a été renvoyé."
      );
    } catch (e) {
      setResendStatus("Erreur réseau.");
    }
  };

  return (
    <div id="loginPage">
      <form onSubmit={handleLogin}>
        <h2>Connexion</h2>

        <label>
          <div className="label-row">
            Nom de compte <span className="star">*</span>
          </div>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </label>

        <label>
          <div className="label-row">
            Mot de passe <span className="star">*</span>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Connexion…" : "Se connecter"}
        </button>

        {/* ✅ section renvoi email affichée seulement si 403 */}
        {needsVerification && (
          <div style={{ width: "100%", marginTop: 10 }}>
            <p style={{ margin: "8px 0" }}>
              Ton compte n’est pas confirmé. Renseigne ton email pour renvoyer
              le lien :
            </p>

            <label>
              <div className="label-row">
                Email <span className="star">*</span>
              </div>
              <input
                type="email"
                value={emailForResend}
                onChange={(e) => setEmailForResend(e.target.value)}
                autoComplete="email"
              />
            </label>

            <button type="button" onClick={handleResend}>
              Renvoyer l’email
            </button>

            {resendStatus && (
              <p style={{ marginTop: 8, opacity: 0.9 }}>{resendStatus}</p>
            )}
          </div>
        )}

        <p>
          Pas encore de compte ? <Link href="/signup">S&apos;inscrire</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
