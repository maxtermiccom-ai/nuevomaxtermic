"use client";

import { ArrowRight, Menu, PanelTop, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  ["Inicio", "/"],
  ["Sobre nosotros", "/about"],
  ["Servicios", "/servicios"],
  ["Obras Ejecutadas", "/obras-ejecutadas"],
  ["Recursos", "/recursos"],
  ["Contacto", "/contacto"],
] as const;

export function SiteHeader({
  title = "Servicios de Climatización",
  ctaLabel = "Solicitar cotización",
  ctaHref = "#contacto",
}: {
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      <header
        className={`border-b transition-all duration-300 ${
          isScrolled
            ? "border-cyan-500/30 bg-slate-950/85 shadow-[0_18px_40px_rgba(15,23,42,0.7)] backdrop-blur-xl"
            : "border-slate-800/80 bg-slate-950/70 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-cyan-400/40 bg-slate-900/80 shadow-[0_0_22px_rgba(0,210,255,0.35)]">
              <img src="/logo-maxtermic.png" alt="Logo de MAXTERMIC, climatización industrial y mantenimiento" className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">MAXTERMIC</div>
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-slate-300">{title}</div>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="relative transition hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-cyan-300 after:transition-transform after:duration-200 hover:after:scale-x-100"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="/admin/login"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-3.5 py-2 text-sm font-medium text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.12)] transition hover:border-cyan-300 hover:shadow-[0_0_22px_rgba(34,211,238,0.24)]"
            >
              <PanelTop size={15} />
              Panel
            </a>
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(34,211,238,0.45)] transition hover:brightness-110"
            >
              {ctaLabel}
              <ArrowRight size={16} />
            </a>
          </div>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-100 transition hover:border-cyan-400/60 hover:text-cyan-200 md:hidden"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className={`${isMobileMenuOpen ? "block" : "hidden"} border-t border-slate-800 bg-slate-950/95 md:hidden`}>
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-6">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-900 hover:text-white"
              >
                {label}
              </a>
            ))}
            <div className="mt-2 grid gap-2 pt-2">
              <a
                href="/admin/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-4 py-3 text-center text-sm font-medium text-cyan-100 transition hover:border-cyan-300 hover:shadow-[0_0_18px_rgba(34,211,238,0.18)]"
              >
                <PanelTop size={15} />
                Panel
              </a>
              <a
                href={ctaHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-3 text-sm font-semibold text-slate-950"
              >
                {ctaLabel}
                <ArrowRight size={16} />
              </a>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
