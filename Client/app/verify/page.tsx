"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { API_ORIGIN } from "@/services/apiOrigin";

export default function VerifyPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const [msg, setMsg] = useState("Vérification en cours…");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMsg("Token manquant.");
      return;
    }

    (async () => {
      try {
        const res = await fetch(
          `${API_ORIGIN}/verify-email?token=${encodeURIComponent(token)}`,
          { cache: "no-store" }
        );

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          setStatus("error");
          setMsg(data?.message ?? "Lien invalide ou expiré.");
          return;
        }

        setStatus("success");
        setMsg("Email vérifié ✅ Redirection vers la connexion…");

        setTimeout(() => {
          router.push("/login?verified=true");
        }, 1200);
      } catch {
        setStatus("error");
        setMsg("Erreur réseau.");
      }
    })();
  }, [token, router]);

  return (
    <div style={{ paddingTop: 120, paddingInline: 16, textAlign: "center" }}>
      <h2
        style={{
          color:
            status === "success"
              ? "#22c55e"
              : status === "error"
              ? "#ef4444"
              : "inherit",
        }}
      >
        {msg}
      </h2>
    </div>
  );
}
