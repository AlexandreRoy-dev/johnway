import { NextResponse } from "next/server";

type ReservationPayload = {
  name?: string;
  email?: string;
  phone?: string;
  startDate?: string;
  endDate?: string;
  address?: string;
  notes?: string;
  items?: unknown;
  total?: number;
};

const inbox: ReservationPayload[] = [];

export async function POST(request: Request) {
  const body = (await request.json()) as ReservationPayload;
  if (!body.email || !body.name || !body.startDate || !body.address) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }
  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "Aucun article" }, { status: 400 });
  }
  inbox.push(body);
  console.log("[johnway:reservation]", body);
  return NextResponse.json({ ok: true });
}
