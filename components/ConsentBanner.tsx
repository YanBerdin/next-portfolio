/*
"use client";

import { useState, useEffect } from "react";
import { enableClarity } from "@/lib/utils/clarity";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("analytics_consent");
      if (consent !== "granted") setVisible(true);
    } catch (_) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 flex items-center justify-between rounded-lg bg-white/95 p-3 shadow-lg dark:bg-zinc-900/95">
      <div className="mr-4 text-sm text-zinc-900 dark:text-zinc-100">
        J'utilise Microsoft Clarity pour analyser l'utilisation du site. Accepter activera l'analyse.
      </div>
      <div className="flex gap-2">
        <button
          className="rounded-md bg-zinc-100 px-3 py-1 text-sm text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100"
          onClick={() => {
            try {
              localStorage.setItem("analytics_consent", "denied");
            } catch (_) {}
            setVisible(false);
          }}
        >
          Refuser
        </button>
        <button
          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
          onClick={async () => {
            try { localStorage.setItem("analytics_consent", "granted"); } catch (_) {}
            await enableClarity();
            setVisible(false);
          }}
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
*/