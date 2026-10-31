"use client";

import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isSupabaseConfigured, signInWithSupabase } from "@/lib/supabase";

const setAdminAuth = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem("maxtermic-admin-auth", "true");
  document.cookie = "maxtermic_admin_auth=true; path=/; max-age=86400; SameSite=Lax";
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasCookieAuth = document.cookie.split(";").some((cookie) => cookie.trim() === "maxtermic_admin_auth=true");
    const hasLocalAuth = window.localStorage.getItem("maxtermic-admin-auth") === "true";

    if (hasCookieAuth || hasLocalAuth) {
      router.replace("/admin");
    }
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Completa email y contraseña para continuar.");
      return;
    }

    if (!isSupabaseConfigured) {
      setAdminAuth();
      router.push("/admin");
      return;
    }

    setLoading(true);
    setError("");

    const result = await signInWithSupabase(email.trim(), password);

    if (!result.success) {
      const errorText = typeof result.error === "string" ? result.error : result.error?.message ?? "No se pudo iniciar sesión con Supabase.";
      setError(errorText);
      setLoading(false);
      return;
    }

    setAdminAuth();
    setLoading(false);
    router.push("/admin");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <a
        href="/"
        className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/60 hover:text-white"
      >
        ← Volver al sitio
      </a>
      <div className="w-full max-w-md rounded-[30px] border border-slate-800 bg-slate-900/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.8)]">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
            <LockKeyhole size={28} />
          </div>
          <div className="text-xs uppercase tracking-[0.35em] text-cyan-300">MAXTERMIC</div>
          <h1 className="mt-4 text-3xl font-black text-white">Acceso privado</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-slate-300">Correo electrónico</label>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3">
              <Mail size={18} className="text-slate-400" />
              <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full bg-transparent text-white outline-none placeholder:text-slate-500" placeholder="Ingrese su usuario" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm text-slate-300">Contraseña</label>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3">
              <LockKeyhole size={18} className="text-slate-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                onClick={() => setShowPassword((current) => !current)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <div className="text-sm text-rose-300">{error}</div>}

          <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-70">
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-xs leading-6 text-slate-400">
          {isSupabaseConfigured
            ? "Usando autenticación real de Supabase Auth."
            : "Modo demo: Ingrese su usuario / Ingresar Contraseña. En producción, usa Supabase Auth."}
        </div>
      </div>
    </main>
  );
}
