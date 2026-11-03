import type { Metadata, Viewport } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { PwaInstallPrompt } from "../components/pwa-install-prompt";
import { PwaRegister } from "../components/pwa-register";
import { WhatsAppFloat } from "../components/whatsapp-float";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  userScalable: false,
  themeColor: "#061a2d",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.maxtermic.com"),
  title: {
    default: "MAXTERMIC | Climatización industrial y mantenimiento en Chile",
    template: "%s | MAXTERMIC",
  },
  description:
    "MAXTERMIC ofrece climatización industrial, comercial e infraestructura crítica, con soluciones de mantenimiento, eficiencia energética y soporte técnico en Chile.",
  applicationName: "MAXTERMIC",
  manifest: "/manifest.webmanifest",
  keywords: [
    "climatización industrial",
    "climatización comercial",
    "mantenimiento HVAC",
    "ventilación mecánica",
    "chiller",
    "torres de enfriamiento",
    "infraestructura crítica",
    "MAXTERMIC Chile",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MAXTERMIC | Climatización industrial y mantenimiento en Chile",
    description:
      "Soluciones de climatización industrial, comercial e infraestructura crítica para proyectos que requieren continuidad operativa, eficiencia energética y soporte técnico de confianza.",
    url: "/",
    siteName: "MAXTERMIC",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MAXTERMIC | Climatización industrial y mantenimiento en Chile",
    description:
      "Soluciones de climatización industrial, comercial e infraestructura crítica para proyectos que requieren continuidad operativa, eficiencia energética y soporte técnico de confianza.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MAXTERMIC",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} ${orbitron.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-950 text-slate-100">
        <PwaRegister />
        {children}
        <WhatsAppFloat />
        <PwaInstallPrompt />
      </body>
    </html>
  );
}
