import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "56967407770";

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quiero consultar sobre un proyecto de climatización.")}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chatear por WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border border-emerald-300/60 bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.45)] transition duration-200 hover:scale-105 hover:shadow-[0_0_35px_rgba(16,185,129,0.6)]"
      title="WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
}
