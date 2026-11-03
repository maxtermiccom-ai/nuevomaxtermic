"use client";

import { ChevronLeft, ChevronRight, ImageIcon, Minus, Pause, Play, Plus, X } from "lucide-react";
import { useMemo, useEffect, useState } from "react";

export function ProjectImageViewer({
  images,
  projectTitle,
  compact = false,
}: {
  images: string[];
  projectTitle: string;
  compact?: boolean;
}) {
  const safeImages = useMemo(
    () => (images ?? []).filter((image) => typeof image === "string" && image.trim().length > 0),
    [images],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (isLightboxOpen || !isAutoPlay || safeImages.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % safeImages.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [isAutoPlay, isLightboxOpen, safeImages.length]);

  const openLightbox = () => {
    setIsLightboxOpen(true);
    setIsAutoPlay(false);
  };
  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setZoomLevel(1);
  };

  const toggleAutoPlay = () => setIsAutoPlay((current) => !current);

  const handleNavigate = (direction: "prev" | "next") => {
    setCurrentIndex((index) => {
      if (direction === "prev") {
        return index === 0 ? safeImages.length - 1 : index - 1;
      }
      return index === safeImages.length - 1 ? 0 : index + 1;
    });
    setZoomLevel(1);
  };

  if (safeImages.length === 0) {
    return (
      <div className="overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900/70">
        <div className={`flex ${compact ? "h-56" : "h-[420px]"} items-center justify-center bg-slate-950/80 text-slate-400`}>
          <div className="flex flex-col items-center gap-3">
            <ImageIcon size={34} className="text-cyan-300" />
            <span className="text-sm uppercase tracking-[0.2em] text-slate-400">Sin imágenes</span>
          </div>
        </div>
      </div>
    );
  }

  const currentImage = safeImages[currentIndex] ?? safeImages[0];

  const goToPrevious = () => setCurrentIndex((index) => (index === 0 ? safeImages.length - 1 : index - 1));
  const goToNext = () => setCurrentIndex((index) => (index === safeImages.length - 1 ? 0 : index + 1));

  return (
    <div className="overflow-hidden rounded-[30px] border border-slate-800 bg-slate-900/70 shadow-[0_24px_60px_rgba(2,6,23,0.45)]">
      <div className="relative">
        <div className={`relative ${compact ? "h-56 sm:h-64" : "h-[260px] sm:h-[360px] md:h-[420px] lg:h-[500px]"} overflow-hidden bg-slate-950`}>
          <button type="button" onClick={openLightbox} className="block h-full w-full text-left" aria-label="Abrir vista ampliada">
            <img src={currentImage} alt={`${projectTitle} vista ${currentIndex + 1}`} className="h-full w-full object-cover object-center transition duration-500 hover:scale-[1.02]" />
          </button>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

          <div className="absolute left-3 top-1/2 flex -translate-y-1/2 items-center gap-2 sm:left-4">
            <button
              type="button"
              onClick={() => handleNavigate("prev")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-950/70 text-white shadow-lg backdrop-blur-sm transition hover:border-cyan-400/60 hover:text-cyan-200 sm:h-12 sm:w-12"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2 sm:right-4">
            <button
              type="button"
              onClick={() => handleNavigate("next")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-950/70 text-white shadow-lg backdrop-blur-sm transition hover:border-cyan-400/60 hover:text-cyan-200 sm:h-12 sm:w-12"
              aria-label="Imagen siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="absolute inset-x-3 bottom-3 flex flex-col gap-2 sm:inset-x-4 sm:bottom-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <div className="rounded-full border border-slate-700 bg-slate-950/70 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-cyan-200 backdrop-blur-sm sm:px-3">
                Visor de imágenes
              </div>
              {safeImages.length > 1 && (
                <button
                  type="button"
                  onClick={toggleAutoPlay}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/70 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-slate-200 backdrop-blur-sm transition hover:border-cyan-400/60 hover:text-cyan-200 sm:px-3"
                >
                  {isAutoPlay ? <Pause size={12} /> : <Play size={12} />}
                  {isAutoPlay ? "Pausar" : "Reproducir"}
                </button>
              )}
            </div>
            <div className="rounded-full border border-slate-700 bg-slate-950/70 px-2.5 py-1 text-[9px] uppercase tracking-[0.22em] text-slate-200 backdrop-blur-sm sm:px-3">
              {currentIndex + 1}/{safeImages.length}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 bg-slate-950/50 p-3">
          <div className="flex gap-2 overflow-x-auto pb-1 sm:gap-3">
            {safeImages.map((image, index) => (
              <button
                key={`${projectTitle}-${image}-${index}`}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`relative ${compact ? "h-14 w-20" : "h-16 w-24 sm:h-20 sm:w-28"} shrink-0 overflow-hidden rounded-xl border transition ${
                  index === currentIndex ? "border-cyan-400 shadow-[0_0_0_1px_rgba(34,211,238,0.5)]" : "border-slate-700 hover:border-slate-500"
                }`}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <img src={image} alt={`${projectTitle} thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                {index === currentIndex && <div className="absolute inset-0 ring-2 ring-inset ring-cyan-400/70" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-2 backdrop-blur-sm sm:p-4" onClick={closeLightbox}>
          <div className="relative w-full max-w-6xl rounded-[28px] border border-slate-700 bg-slate-950/95 p-2 shadow-[0_30px_80px_rgba(15,23,42,0.75)] sm:p-3" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 bg-slate-900/80 text-slate-100 transition hover:border-cyan-400/70 hover:text-cyan-200 sm:right-4 sm:top-4 sm:h-10 sm:w-10"
              aria-label="Cerrar vista ampliada"
            >
              <X size={18} />
            </button>

            <div className="relative overflow-hidden rounded-[22px] bg-slate-950">
              <div className="relative flex h-[56vh] min-h-[220px] max-h-[760px] items-center justify-center overflow-hidden bg-slate-950 sm:h-[70vh]">
                <img
                  src={safeImages[currentIndex]}
                  alt={`${projectTitle} vista ${currentIndex + 1}`}
                  className="max-h-full max-w-full object-contain transition-transform duration-200"
                  style={{ transform: `scale(${zoomLevel})` }}
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 px-1 pb-1 sm:px-2 sm:pb-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoomLevel((value) => Math.max(1, Number((value - 0.25).toFixed(2))))}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-100 hover:border-cyan-400/60 hover:text-cyan-200 sm:h-10 sm:w-10"
                  aria-label="Disminuir zoom"
                >
                  <Minus size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel((value) => Math.min(2.5, Number((value + 0.25).toFixed(2))))}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-100 hover:border-cyan-400/60 hover:text-cyan-200 sm:h-10 sm:w-10"
                  aria-label="Aumentar zoom"
                >
                  <Plus size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-slate-200 hover:border-cyan-400/60 hover:text-cyan-200 sm:px-3 sm:py-2 sm:text-xs"
                >
                  Reset
                </button>
                {safeImages.length > 1 && (
                  <button
                    type="button"
                    onClick={toggleAutoPlay}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-slate-200 hover:border-cyan-400/60 hover:text-cyan-200 sm:px-3 sm:py-2 sm:text-[10px]"
                  >
                    {isAutoPlay ? <Pause size={12} /> : <Play size={12} />}
                    {isAutoPlay ? "Pausar" : "Play"}
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleNavigate("prev")}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-100 hover:border-cyan-400/60 hover:text-cyan-200 sm:h-10 sm:w-10"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-[9px] uppercase tracking-[0.22em] text-slate-200 sm:px-3 sm:py-2 sm:text-[10px]">
                  {currentIndex + 1}/{safeImages.length}
                </div>
                <button
                  type="button"
                  onClick={() => handleNavigate("next")}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-100 hover:border-cyan-400/60 hover:text-cyan-200 sm:h-10 sm:w-10"
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
