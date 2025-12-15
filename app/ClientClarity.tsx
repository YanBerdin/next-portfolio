"use client";
import { useClarity, enableClarity } from "@/lib/utils/clarity";
import { useEffect } from "react";

export default function ClientClarity() {
        useClarity();

        useEffect(() => {
            try {
                // Expose a test hook so integration tests can trigger analytics init.
                // Accessible as `window.__enableClarity()` in tests.
                // @ts-ignore
                window.__enableClarity = enableClarity;
            } catch (_) {}
        }, []);

        return null;
}
