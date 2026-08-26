import Link from "next/link";

import { AnimateIn } from "@/components/animate-in";
import { QuoteForm } from "@/components/quote-form";
import { site } from "@/lib/site";

export function ContactSection() {
  return (
    <section id="contact" className="bg-cream py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <AnimateIn>
            <p className="text-xs font-bold tracking-[0.32em] text-forest uppercase">
              Contact / réservation
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.9] font-bold text-chocolate-deep uppercase">
              Deux portes.
              <span className="block text-forest">Un standard.</span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div className="mt-10 grid gap-4">
              <Link
                href="/produits"
                className="group border border-chocolate/15 bg-card p-6 transition-colors hover:border-forest hover:bg-beige"
              >
                <p className="text-[0.68rem] tracking-[0.2em] text-forest uppercase">
                  Particuliers
                </p>
                <h3 className="mt-1 font-display text-3xl font-bold text-chocolate-deep uppercase">
                  Réserver du matériel
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Choisissez tentes, sono, tables. Prix au jour. Envoyez la
                  réservation. On confirme les dates.
                </p>
              </Link>
              <div className="border border-chocolate-deep bg-chocolate-deep p-6 text-beige">
                <p className="text-[0.68rem] tracking-[0.2em] text-forest-bright uppercase">
                  Entreprises & festivals
                </p>
                <h3 className="mt-1 font-display text-3xl font-bold uppercase">
                  Devis d’événement
                </h3>
                <p className="mt-2 text-beige/75">
                  Un site, une date, un nombre de têtes. On construit le devis
                  clé en main, pas une facture de quincaillerie.
                </p>
              </div>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              {site.region} · {site.email} · {site.hours}
            </p>
          </AnimateIn>
        </div>
        <AnimateIn delay={0.15}>
          <div className="border border-chocolate/10 bg-card p-6 shadow-[0_24px_60px_rgba(26,16,12,0.08)] sm:p-8">
            <h3 className="font-display text-3xl font-bold text-chocolate-deep uppercase">
              Demande de devis
            </h3>
            <p className="mt-2 text-muted-foreground">
              Réponse sous 24 h ouvrables.
            </p>
            <div className="mt-6">
              <QuoteForm compact />
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
