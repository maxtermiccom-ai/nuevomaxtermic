import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getContactRecipient } from "@/lib/site-settings";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      company?: string;
      message?: string;
    };

    const name = body.name?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim();
    const company = body.company?.trim();
    const message = body.message?.trim();

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { message: "Faltan datos obligatorios para enviar la solicitud." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ message: "El correo de contacto no es válido." }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT ?? 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || smtpUser || "noreply@maxtermic.cl";

    if (!smtpHost || !smtpUser || !smtpPass) {
      return NextResponse.json(
        {
          message:
            "La entrega de correos aún no está configurada en el servidor. Define SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS y SMTP_FROM.",
        },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const recipient = await getContactRecipient();

    await transporter.sendMail({
      from: smtpFrom,
      to: recipient,
      replyTo: email,
      subject: `Nueva solicitud de cotización - ${name}`,
      text: [
        `Nombre: ${name}`,
        `Email: ${email}`,
        `Teléfono: ${phone}`,
        `Empresa: ${company || "No indicada"}`,
        "",
        "Mensaje:",
        message,
      ].join("\n"),
      html: `
        <h2 style="margin:0 0 16px; font-family:Arial,sans-serif;">Nueva solicitud de cotización</h2>
        <p style="font-family:Arial,sans-serif; margin:0 0 8px;"><strong>Nombre:</strong> ${name}</p>
        <p style="font-family:Arial,sans-serif; margin:0 0 8px;"><strong>Email:</strong> ${email}</p>
        <p style="font-family:Arial,sans-serif; margin:0 0 8px;"><strong>Teléfono:</strong> ${phone}</p>
        <p style="font-family:Arial,sans-serif; margin:0 0 8px;"><strong>Empresa:</strong> ${company || "No indicada"}</p>
        <div style="margin-top:18px; padding:16px; border-radius:12px; background:#f8fafc; font-family:Arial,sans-serif;">
          <strong>Mensaje:</strong>
          <p style="margin:12px 0 0; white-space:pre-wrap;">${message.replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Solicitud enviada correctamente." });
  } catch (error) {
    console.error("Contact email error:", error);
    const message = error instanceof Error ? error.message : "No se pudo enviar la solicitud.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
