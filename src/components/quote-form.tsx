"use client";

import { useState, type FormEvent } from "react";

import { submitForm } from "@/lib/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const eventTypes = [
  "Festival",
  "Mariage",
  "Corporatif",
  "Municipal",
  "Privé",
  "Autre",
];

const serviceOptions = [
  "Chapiteaux / tentes",
  "Sono & scène",
  "Installation",
  "Animation",
  "Mobilier",
  "Éclairage",
  "Coordination jour J",
];

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = event.currentTarget;
    const data = new FormData(form);
    const services = data.getAll("services");

    const payload = {
      company: String(data.get("company") || ""),
      contact: String(data.get("contact") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      eventType: String(data.get("eventType") || ""),
      date: String(data.get("date") || ""),
      guests: String(data.get("guests") || ""),
      location: String(data.get("location") || ""),
      services,
      notes: String(data.get("notes") || ""),
    };

    try {
      await submitForm({ form: "devis", ...payload });
      setStatus("success");
      setMessage(
        "Devis reçu. On revient vers vous sous 24 h avec une proposition clé en main.",
      );
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Envoi impossible pour le moment. Écrivez-nous à info@johnway.ca.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-forest/30 bg-forest-deep p-8 text-beige">
        <p className="font-display text-3xl font-bold uppercase">C’est parti.</p>
        <p className="mt-3 text-beige/80">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <Label htmlFor="company">Entreprise / organisme</Label>
          <Input id="company" name="company" required placeholder="Nom de l’organisation" />
        </div>
        <div>
          <Label htmlFor="contact">Personne-ressource</Label>
          <Input id="contact" name="contact" required placeholder="Prénom et nom" />
        </div>
      </div>
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <Label htmlFor="email">Courriel</Label>
          <Input id="email" name="email" type="email" required placeholder="vous@entreprise.ca" />
        </div>
        <div>
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" name="phone" type="tel" required placeholder="819 000-0000" />
        </div>
      </div>
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <Label htmlFor="eventType">Type d’événement</Label>
          <select
            id="eventType"
            name="eventType"
            required
            className="h-12 w-full rounded-md border border-input bg-card px-3.5 text-base"
            defaultValue=""
          >
            <option value="" disabled>
              Choisir
            </option>
            {eventTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" name="date" type="date" required />
        </div>
      </div>
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <Label htmlFor="guests">Nombre de personnes</Label>
          <Input id="guests" name="guests" type="number" min={1} required placeholder="180" />
        </div>
        <div>
          <Label htmlFor="location">Lieu</Label>
          <Input id="location" name="location" required placeholder="Ville, site, terrain" />
        </div>
      </div>
      <fieldset>
        <legend className="mb-2 text-xs font-semibold tracking-[0.16em] text-chocolate uppercase">
          Besoins
        </legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {serviceOptions.map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="services"
                value={option}
                className="size-4 accent-forest"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <Label htmlFor="notes">Précisions</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Dates de montage, contraintes de terrain, budget, animation…"
        />
      </div>
      {status === "error" ? (
        <p className="text-sm text-destructive">{message}</p>
      ) : null}
      <Button
        type="submit"
        disabled={status === "loading"}
        className="h-14 rounded-md bg-forest-bright text-[0.78rem] font-bold tracking-[0.18em] uppercase hover:bg-forest"
      >
        {status === "loading" ? "Envoi…" : "Envoyer le devis"}
      </Button>
    </form>
  );
}
