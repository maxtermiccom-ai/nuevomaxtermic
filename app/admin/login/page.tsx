"use client";

import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isSupabaseConfigured, signInWithSupabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@maxtermic.cl");
  const [password, setPassword] = useState("maxtermic123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Completa email y contraseña para continuar.");
      return;
    }

    if (!isSupabaseConfigured) {
      localStorage.setItem("maxtermic-admin-auth", "true");
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

    localStorage.setItem("maxtermic-admin-auth", "true");
    setLoading(false);
    router.push("/admin");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
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
              <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full bg-transparent text-white outline-none placeholder:text-slate-500" placeholder="admin@maxtermic.cl" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm text-slate-300">Contraseña</label>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3">
              <LockKeyhole size={18} className="text-slate-400" />
              <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full bg-transparent text-white outline-none placeholder:text-slate-500" placeholder="••••••••" />
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
            : "Modo demo: admin@maxtermic.cl / maxtermic123. En producción, usa Supabase Auth."}
        </div>
      </div>
    </main>
  );
}
