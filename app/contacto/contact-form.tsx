"use client";

import { ArrowRight, MapPin, MessageSquareText, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";

type ContactFormProps = {
  faqItems: string[];
};

export function ContactForm({ faqItems }: ContactFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (status) {
      setStatus(null);
    }
  };

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidEmail(form.email)) {
      setStatus({
        type: "error",
        message: "Ingresa un correo electrónico válido.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "No se pudo enviar la solicitud.");
      }

      setStatus({ type: "success", message: "Solicitud enviada correctamente. Te responderemos a la brevedad." });
      setForm({ name: "", email: "", phone: "", company: "", message: "" });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "No se pudo enviar la solicitud.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100">
      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[30px] border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Formulario</p>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Hablemos de tu proyecto</h1>
            <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Nombre</label>
                <input
                  value={form.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Empresa</label>
                <input
                  value={form.company}
                  onChange={(event) => handleChange("company", event.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500"
                  placeholder="Nombre de la empresa"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => handleChange("email", event.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500"
                  placeholder="correo@empresa.cl"
                  required
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  title="Ingresa un correo electrónico válido"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Teléfono</label>
                <input
                  value={form.phone}
                  onChange={(event) => handleChange("phone", event.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500"
                  placeholder="+56967407770"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm text-slate-300">Mensaje</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(event) => handleChange("message", event.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500"
                  placeholder="Cuéntanos tus necesidades"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Enviando..." : "Enviar solicitud"}
                  <ArrowRight size={16} />
                </button>
                {status && (
                  <p className={`mt-3 text-sm ${status.type === "success" ? "text-emerald-400" : "text-rose-400"}`}>
                    {status.message}
                  </p>
                )}
              </div>
            </form>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[30px] border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex items-center gap-3 text-cyan-300">
                <Phone size={18} />
                <h2 className="text-lg font-semibold text-white">Contacto directo</h2>
              </div>
              <ul className="mt-5 space-y-4 text-sm text-slate-300">
                <li>+56 9 7500 571</li>
                <li>r.alva@maxtermic.com</li>
                <li>Av. Providencia 1208, Of. 207, Providencia, Santiago, Chile</li>
              </ul>
            </div>

            <div className="rounded-[30px] border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex items-center gap-3 text-cyan-300">
                <MapPin size={18} />
                <h2 className="text-lg font-semibold text-white">Sede</h2>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-300">Av. Providencia 1208, Of. 207, Providencia, Santiago, Chile.</p>
            </div>

            <div className="rounded-[30px] border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex items-center gap-3 text-cyan-300">
                <MessageSquareText size={18} />
                <h2 className="text-lg font-semibold text-white">Preguntas frecuentes</h2>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-slate-300">
                {faqItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
