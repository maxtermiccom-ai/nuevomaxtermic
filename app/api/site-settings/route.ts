import { NextResponse } from "next/server";
import { getContactRecipient, setContactRecipient } from "@/lib/site-settings";

export async function GET() {
  const contactEmail = await getContactRecipient();

  return NextResponse.json({ contactEmail });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { contactEmail?: string };
    const contactEmail = await setContactRecipient(body.contactEmail ?? "");

    return NextResponse.json({ contactEmail });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo guardar la configuración.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
