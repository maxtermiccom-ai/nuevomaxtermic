import QuienesSomosPage from "../quienes-somos/page";

export const metadata = {
  title: "Sobre nosotros",
  description:
    "Conoce la historia, misión y valores de MAXTERMIC, especialista en climatización industrial y mantenimiento técnico en Chile.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <QuienesSomosPage />;
}
