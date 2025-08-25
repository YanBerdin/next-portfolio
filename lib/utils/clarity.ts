"use client";

import Clarity from "@microsoft/clarity";
import { useEffect } from "react";

export function useClarity() {
  useEffect(() => {
    Clarity.init("slgv50xvaf"); // Project ID
  }, []);
}
