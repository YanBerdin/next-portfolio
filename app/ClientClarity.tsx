"use client";
import { useClarity, enableClarity } from "@/lib/utils/clarity";
import { useEffect } from "react";

export default function ClientClarity() {
    useClarity();

    useEffect(() => {
        try {
            // Persist consent automatically and initialize Clarity immediately.
            try { localStorage.setItem("analytics_consent", "granted"); } catch (_) {}
            // Initialize analytics
            enableClarity();
            // Keep test hook for integration tests
            // @ts-ignore
            window.__enableClarity = enableClarity;
        } catch (_) {}
    }, []);

    return null;
}
