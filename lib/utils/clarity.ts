"use client";

import { useEffect } from "react";

// Lazy-init Clarity only when consent is given.
// Export a hook for automatic init when consent exists, and an explicit
// `enableClarity` function that callers (e.g. a consent banner) can use.

export async function enableClarity() {
  try {
    // Prefer injecting the official Clarity loader snippet directly. This
    // avoids depending on the npm package shape and guarantees the same
    // runtime behaviour as the upstream script.
    if (typeof window !== "undefined" && !(window as any).clarity) {
      (function(c: any, l: any, a: any, r: any, i: any) {
        c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments); };
        const t = l.createElement(r);
        t.async = 1;
        t.src = `https://www.clarity.ms/tag/${i}`;
        const y = l.getElementsByTagName(r)[0];
        if (y && y.parentNode) y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", "slgv50xvaf");
      try { localStorage.setItem("analytics_consent", "granted"); } catch (_) {}
    }
  } catch (e) {
    // Dynamic import failed; swallow error to avoid breaking the app
    // (optional: report to client-side logging)
    // console.error('Failed to load Clarity', e);
  }
}

export function useClarity() {
  useEffect(() => {
    try {
      const consent = localStorage.getItem("analytics_consent");
      if (consent === "granted") {
        // Inject the official snippet so Clarity loads consistently.
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        (async () => {
          try {
            if (typeof window !== "undefined" && !(window as any).clarity) {
              (function(c: any, l: any, a: any, r: any, i: any) {
                c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments); };
                const t = l.createElement(r);
                t.async = 1;
                t.src = `https://www.clarity.ms/tag/${i}`;
                const y = l.getElementsByTagName(r)[0];
                if (y && y.parentNode) y.parentNode.insertBefore(t, y);
              })(window, document, "clarity", "script", "slgv50xvaf");
            }
          } catch (_) {}
        })();
      }
    } catch (_) {
      // localStorage not available or other error; do nothing
    }
  }, []);
}
