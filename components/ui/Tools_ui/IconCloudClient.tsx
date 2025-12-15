"use client";
import React, { useEffect, useState } from "react";
import { IconCloudComp } from "./IconCloudComp";

export default function IconCloudClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <IconCloudComp />;
}
