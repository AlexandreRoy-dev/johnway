"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Trash2 } from "lucide-react";

import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitForm } from "@/lib/forms";
import { formatPrice } from "@/lib/format";

export function ReservationForm() {
  const { lines, total, updateItem, removeItem, clear, count } = useCart();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lines.length === 0) return;
    setStatus("loading");
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      startDate: String(data.get("startDate") || ""),
      endDate: String(data.get("endDate") || ""),
      address: String(data.get("address") || ""),
      notes: String(data.get("notes") || ""),
      items: lines.map((line) => ({
        slug: line.product.slug,
        name: line.product.name,
        quantity: line.quantity,
        days: line.days,
        lineTotal: line.lineTotal,
      })),
      total,
    };

    try {
      await submitForm({ form: "reservation", ...payload });
      setStatus("success");
      setMessage(
        "Réservation envoyée. On confirme la disponibilité et les détails de livraison sous 24 h.",
      );
      clear();
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Envoi impossible. Réessayez ou écrivez à info@johnway.ca.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-forest/30 bg-forest-deep p-10 text-beige">
        <p className="font-display text-4xl font-bold uppercase">Reçu.</p>
        <p className="mt-4 max-w-lg text-lg text-beige/80">{message}</p>
        <Link
          href="/produits"
          className="mt-8 inline-flex h-12 items-center bg-forest-bright px-6 text-xs font-bold tracking-[0.16em] uppercase"
        >
          Continuer
        </Link>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="border border-dashed border-chocolate/25 bg-card p-10 text-center">
        <p className="font-display text-4xl font-bold text-chocolate-deep uppercase">
          Panier vide
        </p>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Ajoutez des tentes, de la sono ou du mobilier depuis le catalogue,
          puis envoyez votre réservation.
        </p>
        <Link
          href="/produits"
          className="mt-6 inline-flex h-12 items-center bg-forest-bright px-6 text-xs font-bold tracking-[0.16em] text-beige uppercase"
        >
          Voir le matériel
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        {lines.map((line) => (
          <div
            key={line.product.slug}
            className="flex flex-col gap-4 border border-chocolate/10 bg-card p-4 sm:flex-row sm:items-center"
          >
            <div className="flex-1">
              <p className="font-display text-2xl font-bold text-chocolate-deep uppercase">
                {line.product.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatPrice(line.product.pricePerDay)} / jour
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs tracking-wide uppercase">
                Qté
                <Input
                  type="number"
                  min={1}
                  className="mt-1 h-10 w-16"
                  value={line.quantity}
                  onChange={(event) =>
                    updateItem(line.product.slug, {
                      quantity: Number(event.target.value) || 1,
                    })
                  }
                />
              </label>
              <label className="text-xs tracking-wide uppercase">
                Jours
                <Input
                  type="number"
                  min={1}
                  className="mt-1 h-10 w-16"
                  value={line.days}
                  onChange={(event) =>
                    updateItem(line.product.slug, {
                      days: Number(event.target.value) || 1,
                    })
                  }
                />
              </label>
              <p className="min-w-24 text-right font-display text-2xl font-bold text-forest">
                {formatPrice(line.lineTotal)}
              </p>
              <button
                type="button"
                onClick={() => removeItem(line.product.slug)}
                className="text-muted-foreground hover:text-destructive"
                aria-label={`Retirer ${line.product.name}`}
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
        <p className="text-right font-display text-4xl font-bold text-chocolate-deep">
          {formatPrice(total)}
          <span className="block text-sm font-medium tracking-normal text-muted-foreground">
            Estimation matériel, avant installation et taxes
          </span>
        </p>
      </div>

      <div className="space-y-4 border border-chocolate/10 bg-card p-6">
        <h2 className="font-display text-3xl font-bold text-chocolate-deep uppercase">
          Vos coordonnées
        </h2>
        <div>
          <Label htmlFor="name">Nom</Label>
          <Input id="name" name="name" required />
        </div>
        <div>
          <Label htmlFor="email">Courriel</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" name="phone" type="tel" required />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="startDate">Début</Label>
            <Input id="startDate" name="startDate" type="date" required />
          </div>
          <div>
            <Label htmlFor="endDate">Fin</Label>
            <Input id="endDate" name="endDate" type="date" required />
          </div>
        </div>
        <div>
          <Label htmlFor="address">Adresse de livraison / site</Label>
          <Input id="address" name="address" required placeholder="Adresse complète" />
        </div>
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" name="notes" placeholder="Accès, horaire, installation…" />
        </div>
        {status === "error" ? (
          <p className="text-sm text-destructive">{message}</p>
        ) : null}
        <Button
          type="submit"
          disabled={status === "loading"}
          className="h-14 w-full rounded-md bg-forest-bright text-[0.78rem] font-bold tracking-[0.18em] uppercase hover:bg-forest"
        >
          {status === "loading" ? "Envoi…" : "Envoyer la réservation"}
        </Button>
      </div>
    </form>
  );
}
