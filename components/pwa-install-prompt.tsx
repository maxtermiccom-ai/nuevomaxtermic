"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>; 
};

const isIOSDevice = () => {
  if (typeof navigator === "undefined") {
    return false;
  }

  const userAgent = navigator.userAgent || "";
  return /iPad|iPhone|iPod/i.test(userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
};

const isStandaloneMode = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(display-mode: standalone)").matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
};

export function PwaInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const installed = isStandaloneMode();
    setIsInstalled(installed);

    const dismissed = window.localStorage.getItem("maxtermic-pwa-dismissed") === "true";
    if (installed || dismissed) {
      return;
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setShowIOSGuide(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    if (isIOSDevice()) {
      setShowPrompt(true);
      setShowIOSGuide(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const dismissPrompt = () => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem("maxtermic-pwa-dismissed", "true");
    setShowPrompt(false);
  };

  const handleInstall = async () => {
    if (!installPrompt) {
      return;
    }

    try {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;

      if (choice.outcome === "accepted") {
        setShowPrompt(false);
      }
    } catch (error) {
      console.error("PWA: no se pudo iniciar la instalación", error);
    }
  };

  if (isInstalled || !showPrompt) {
    return null;
  }

  return (
    <div className="fixed inset-x-3 bottom-4 z-50 md:inset-x-auto md:right-6 md:bottom-6 md:w-[400px]">
      <div className="rounded-[24px] border border-cyan-500/30 bg-slate-950/90 p-4 shadow-[0_20px_50px_rgba(14,116,144,0.35)] backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-cyan-300">Instalación</div>
            <h2 className="mt-2 text-base font-black text-white">Instala MAXTERMIC</h2>
          </div>
          <button
            type="button"
            onClick={dismissPrompt}
            aria-label="Cerrar aviso de instalación"
            className="rounded-full border border-slate-700 bg-slate-900/80 px-2 py-1 text-xs text-slate-300"
          >
            ✕
          </button>
        </div>

        <p className="mt-3 text-sm text-slate-300">
          {showIOSGuide
            ? "Para instalar la app en iPhone o iPad, abre Safari, pulsa Compartir y elige Añadir a pantalla de inicio."
            : "Añade esta aplicación a tu pantalla de inicio para acceder más rápido y mantener la experiencia móvil optimizada."}
        </p>

        {!showIOSGuide && installPrompt && (
          <button
            type="button"
            onClick={handleInstall}
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-3 text-sm font-semibold text-slate-950"
          >
            Instalar aplicación
          </button>
        )}

        {showIOSGuide && (
          <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-3 text-sm text-slate-200">
            <p className="font-medium text-cyan-200">Safari → Compartir → Añadir a pantalla de inicio</p>
          </div>
        )}
      </div>
    </div>
  );
}
