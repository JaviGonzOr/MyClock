"use client";

import { useEffect } from "react";

export default function RegisterSW() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      !("serviceWorker" in navigator)
    ) {
      return;
    }

    navigator.serviceWorker
      .register("/sw.js")
      .then(() => console.log("✅ Service Worker registrado"))
      .catch((err) =>
        console.error("❌ Error registrando SW:", err)
      );
  }, []);

  return null;
}