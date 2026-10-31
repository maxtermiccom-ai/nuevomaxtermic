import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export default function PoliticaPrivacidadPage() {
  return (
    <div className="bg-slate-950 text-slate-100">
      <SiteHeader title="Política de privacidad" ctaLabel="Contactar" ctaHref="/contacto" />

      <main className="mx-auto max-w-4xl px-5 py-16 text-slate-100 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black tracking-[-0.04em] text-white">Política de privacidad</h1>
        <div className="mt-8 space-y-5 text-sm leading-7 text-slate-300">
          <p>Esta política describe cómo MAXTERMIC recopila, usa y protege la información personal que nos entrega a través de su sitio web.</p>
          <p>La información se utiliza exclusivamente para responder consultas, enviar cotizaciones y mantener comunicación comercial relacionada con los servicios ofrecidos.</p>
          <p>No se compartirá información sensible con terceros, salvo requerimiento legal o cuando sea necesario para la prestación del servicio.</p>
        </div>
      </main>
    </div>
  );
}
