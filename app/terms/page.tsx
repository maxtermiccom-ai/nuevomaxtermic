import TerminosPage from "../terminos/page";

export const metadata = {
  title: "Términos y condiciones",
  description:
    "Consulta los términos y condiciones de uso del sitio web de MAXTERMIC y la información legal asociada.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return <TerminosPage />;
}
