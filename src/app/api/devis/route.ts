import { NextResponse } from "next/server";

type QuotePayload = {
  company?: string;
  contact?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  date?: string;
  guests?: string;
  location?: string;
  services?: unknown;
  notes?: string;
};

const inbox: QuotePayload[] = [];

export async function POST(request: Request) {
  const body = (await request.json()) as QuotePayload;
  if (!body.email || !body.company || !body.contact || !body.date) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }
  inbox.push(body);
  console.log("[johnway:devis]", body);
  return NextResponse.json({ ok: true });
}
