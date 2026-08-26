import type { Metadata } from "next";
import Link from "next/link";

import { QuoteForm } from "@/components/quote-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez Johnway pour une réservation ou un devis d’événement.",
};

export default function ContactPage() {
  return (
    <div className="bg-cream pt-28 pb-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-xs font-bold tracking-[0.32em] text-forest uppercase">
            Contact
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.8rem,6vw,5rem)] leading-[0.88] font-bold text-chocolate-deep uppercase">
            Écrivez.
            <span className="block text-forest">On revient.</span>
          </h1>
          <ul className="mt-8 space-y-3 text-lg text-chocolate">
            <li>{site.region}</li>
            <li>
              <a href={`mailto:${site.email}`} className="underline">
                {site.email}
              </a>
            </li>
            <li>{site.hours}</li>
            <li>{site.serviceArea}</li>
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/reservation"
              className="inline-flex h-12 items-center justify-center border border-chocolate-deep px-6 text-xs font-bold tracking-[0.16em] uppercase"
            >
              Réservation particulier
            </Link>
            <Link
              href="/produits"
              className="inline-flex h-12 items-center justify-center bg-chocolate-deep px-6 text-xs font-bold tracking-[0.16em] text-beige uppercase"
            >
              Catalogue
            </Link>
          </div>
        </div>
        <div className="border border-chocolate/10 bg-card p-6 sm:p-8">
          <h2 className="font-display text-3xl font-bold uppercase">Devis</h2>
          <div className="mt-6">
            <QuoteForm />
          </div>
        </div>
      </div>
    </div>
  );
}
