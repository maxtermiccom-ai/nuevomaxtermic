import { NextResponse } from "next/server";

const requiredKeys = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"];

export async function GET() {
  const loaded = Object.fromEntries(
    requiredKeys.map((key) => [key, Boolean(process.env[key] && process.env[key]?.trim())]),
  );

  const missing = requiredKeys.filter((key) => !loaded[key]);

  return NextResponse.json({
    ok: missing.length === 0,
    required: requiredKeys,
    loaded,
    missing,
    message:
      missing.length > 0
        ? "Faltan variables de entorno SMTP en el servidor."
        : "Las variables SMTP están presentes en el entorno del servidor.",
  });
}
