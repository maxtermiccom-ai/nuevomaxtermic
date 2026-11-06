import { NextRequest, NextResponse } from "next/server";

const llmsLinkHeader = '</llms.txt>; rel="alternate"; type="text/markdown"; title="MAXTERMIC llms.txt"';
const markdownResponse = `# MAXTERMIC

MAXTERMIC es una empresa especializada en climatización industrial, comercial e infraestructura crítica en Chile. Ofrecemos soluciones de diseño, instalación, mantenimiento, eficiencia energética y soporte técnico para proyectos que requieren continuidad operativa.

## Servicios principales
- Climatización industrial y VRV/VRF
- Chiller y torres de enfriamiento
- Ventilación mecánica y extracción
- Mantenimiento preventivo y correctivo

## Sitio
- Inicio: https://www.maxtermic.com/
- Sobre nosotros: https://www.maxtermic.com/about
- Servicios: https://www.maxtermic.com/servicios
- Obras ejecutadas: https://www.maxtermic.com/obras-ejecutadas
- Recursos: https://www.maxtermic.com/recursos
- Contacto: https://www.maxtermic.com/contacto
- Términos: https://www.maxtermic.com/terms

## Contacto
- Teléfono: +56 9 6674 0770
- Correo: r.alva@maxtermic.com
- Ubicación: Santiago, Chile
`;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const isAuthenticated = request.cookies.get("maxtermic_admin_auth")?.value === "true";

    if (pathname === "/admin/login") {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }

      return NextResponse.next();
    }

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (pathname === "/") {
    const acceptHeader = request.headers.get("accept") ?? "";

    if (acceptHeader.toLowerCase().includes("text/markdown")) {
      return new NextResponse(markdownResponse, {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          Link: llmsLinkHeader,
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    const response = NextResponse.next();
    response.headers.set("Link", llmsLinkHeader);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/"],
};
