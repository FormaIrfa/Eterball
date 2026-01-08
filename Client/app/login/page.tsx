"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import "./login.scss";
import { login } from "../store/auth/authSlice";
import { RootState } from "../store/auth";
import { API_ORIGIN } from "@/services/apiOrigin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ✅ pour renvoi email si non vérifié
  const [needsVerification, setNeedsVerification] = useState(false);
  const [emailForResend, setEmailForResend] = useState("");
  const [resendMsg, setResendMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useDispatch();

  const isConnected = useSelector((store: RootState) => store.auth.isConnected);

  useEffect(() => {
    if (isConnected) router.replace("/");
  }, [isConnected, router]);

  // (optionnel) message après vérification email
  useEffect(() => {
    if (params.get("verified") === "true") {
      setResendMsg("Email confirmé ✅ Tu peux te connecter.");
    }
  }, [params]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setResendMsg(null);
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
        setResendMsg(
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

  const handleResendVerification = async () => {
    setResendMsg(null);

    if (!emailForResend) {
      setResendMsg("Entre ton email pour renvoyer le lien de confirmation.");
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
        setResendMsg(data?.error || "Erreur lors du renvoi.");
        return;
      }

      setResendMsg(
        data?.message || "Si un compte existe, un email a été renvoyé."
      );
    } catch (e) {
      setResendMsg("Erreur réseau.");
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

        {/*  section qui apparaît seulement si email non vérifié */}
        {needsVerification && (
          <div style={{ width: "100%", marginTop: 12 }}>
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

            <button type="button" onClick={handleResendVerification}>
              Renvoyer l’email de confirmation
            </button>
          </div>
        )}

        {resendMsg && (
          <p style={{ marginTop: 10, opacity: 0.95, textAlign: "center" }}>
            {resendMsg}
          </p>
        )}

        <p>
          Pas encore de compte ? <Link href="/signup">S&apos;inscrire</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
