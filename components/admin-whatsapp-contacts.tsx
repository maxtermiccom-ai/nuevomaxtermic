"use client";

import { MessageCircle, MousePointerClick, RefreshCw, UsersRound } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type WhatsAppInteraction = {
  id: string;
  event_type: "click";
  source: string;
  page_path: string;
  phone: string | null;
  created_at: string;
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("es-CL", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));

export function AdminWhatsAppContacts() {
  const [interactions, setInteractions] = useState<WhatsAppInteraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadInteractions = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      setErrorMessage("Configura Supabase para guardar y consultar los contactos WhatsApp.");
      setInteractions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrorMessage("");
    const { data, error } = await supabase
      .from("whatsapp_interactions")
      .select("id, event_type, source, page_path, phone, created_at")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) {
      setErrorMessage(error.code === "PGRST205"
        ? "La tabla de clics todavía no existe. Ejecuta supabase/migrations/20261122_whatsapp_interactions.sql en el SQL Editor de Supabase."
        : "No se pudieron cargar los clics. Revisa la configuración SQL de Supabase y que el administrador haya iniciado sesión.");
      setInteractions([]);
    } else {
      setInteractions((data ?? []) as WhatsAppInteraction[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadInteractions();
  }, [loadInteractions]);

  const clicks = interactions.length;
  const availableNumbers = new Set(interactions.map((interaction) => interaction.phone).filter(Boolean)).size;

  return (
    <section className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400"><MousePointerClick size={15} className="text-emerald-300" /> Clics en WhatsApp</div>
          <div className="mt-3 text-3xl font-black text-white">{clicks}</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400"><UsersRound size={15} className="text-cyan-300" /> Números recibidos por API</div>
          <div className="mt-3 text-3xl font-black text-white">{availableNumbers}</div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900/80">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 p-5 sm:p-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-emerald-300"><MessageCircle size={14} /> WhatsApp</div>
            <h2 className="mt-2 text-2xl font-black text-white">Clics en el botón</h2>
            <p className="mt-1 text-sm text-slate-400">WhatsApp no comparte el número de la persona con el sitio cuando hace clic.</p>
          </div>
          <button type="button" onClick={() => void loadInteractions()} disabled={loading} className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/60 disabled:opacity-50">
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Actualizar
          </button>
        </div>

        {errorMessage && <div role="status" className="m-5 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm leading-6 text-amber-100">{errorMessage}</div>}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-950/60 text-xs uppercase tracking-[0.16em] text-slate-400">
              <tr>
                <th className="px-5 py-4 font-medium">Evento</th>
                <th className="px-5 py-4 font-medium">Número WhatsApp</th>
                <th className="px-5 py-4 font-medium">Página</th>
                <th className="px-5 py-4 font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {interactions.map((interaction) => (
                <tr key={interaction.id} className="text-slate-300">
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
                      Clic
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-400">{interaction.phone || "No disponible al hacer clic"}</td>
                  <td className="px-5 py-4 text-slate-400">{interaction.page_path || "/"}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-slate-400">{formatDate(interaction.created_at)}</td>
                </tr>
              ))}
              {!loading && !errorMessage && interactions.length === 0 && (
                <tr><td colSpan={4} className="px-5 py-12 text-center text-slate-400">Todavía no hay actividad de WhatsApp registrada.</td></tr>
              )}
              {loading && interactions.length === 0 && (
                <tr><td colSpan={4} className="px-5 py-12 text-center text-slate-400">Cargando actividad...</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
