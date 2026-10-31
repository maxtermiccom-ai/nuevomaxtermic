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
};

export const metadata: Metadata = {
  title: "MAXTERMIC | Servicios de Climatización",
  description:
    "Landing web profesional para MAXTERMIC, especializada en climatización industrial, comercial e infraestructura crítica.",
  applicationName: "MAXTERMIC",
  manifest: "/manifest.webmanifest",
  themeColor: "#061a2d",
  colorScheme: "dark",
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
