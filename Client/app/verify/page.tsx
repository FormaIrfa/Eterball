"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { API_ORIGIN } from "@/services/apiOrigin";

export default function VerifyPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const [msg, setMsg] = useState("Vérification en cours…");

  useEffect(() => {
    (async () => {
      if (!token) {
        setMsg("Token manquant.");
        return;
      }

      try {
        const res = await fetch(
          `${API_ORIGIN}/verify-email?token=${encodeURIComponent(token)}`
        );

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          setMsg(data?.message ?? "Lien invalide ou expiré.");
          return;
        }

        setMsg("Email vérifié ✅ Redirection vers la connexion…");
        setTimeout(() => router.push("/login?verified=true"), 1200);
      } catch {
        setMsg("Erreur réseau.");
      }
    })();
  }, [token, router]);

  return (
    <div style={{ paddingTop: 120, paddingInline: 16, textAlign: "center" }}>
      <h2>{msg}</h2>
    </div>
  );
}
