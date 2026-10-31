"use client";

import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
        if (registration.installing) {
          console.info("PWA: service worker installing");
        }
      } catch (error) {
        console.error("PWA: no se pudo registrar el service worker", error);
      }
    };

    void registerServiceWorker();
  }, []);

  return null;
}
