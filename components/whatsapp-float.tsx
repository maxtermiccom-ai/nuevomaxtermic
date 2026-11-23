"use client";

import { MessageCircle } from "lucide-react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const WHATSAPP_NUMBER = "56967407770";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola, quiero consultar sobre un proyecto de climatización.",
)}`;

export function WhatsAppFloat() {
  const recordClick = () => {
    if (!isSupabaseConfigured || !supabase) return;

    void (async () => {
      try {
        const { error } = await supabase.from("whatsapp_interactions").insert({
          event_type: "click",
          source: "floating_button",
          page_path: window.location.pathname,
        });
        if (error) console.error("No se pudo registrar el clic de WhatsApp:", error.message);
      } catch (error) {
        console.error("No se pudo registrar el clic de WhatsApp:", error);
      }
    })();
  };

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      onClick={recordClick}
      aria-label="Chatear por WhatsApp"
      title="WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border border-emerald-300/60 bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.45)] transition duration-200 hover:scale-105 hover:shadow-[0_0_35px_rgba(16,185,129,0.6)]"
    >
      <MessageCircle size={26} />
    </a>
  );
}
