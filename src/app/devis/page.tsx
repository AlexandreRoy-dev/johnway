import type { Metadata } from "next";

import { QuoteForm } from "@/components/quote-form";

export const metadata: Metadata = {
  title: "Devis événement",
  description:
    "Demandez un devis clé en main pour un festival, un mariage d’entreprise, un gala ou un site municipal.",
};

export default function DevisPage() {
  return (
    <div className="bg-cream pt-28 pb-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-xs font-bold tracking-[0.32em] text-forest uppercase">
            Entreprises & festivals
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.8rem,6vw,5.2rem)] leading-[0.88] font-bold text-chocolate-deep uppercase">
            Un devis.
            <span className="block text-forest">Un site.</span>
            <span className="block">Une équipe.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Pas une liste de SKU. Un projet : dates, jauge, terrain, sono,
            chapiteau, animation. On revient avec une proposition claire,
            installation comprise.
          </p>
          <ul className="mt-8 space-y-3 text-chocolate">
            <li>Festivals et sites municipaux</li>
            <li>Galas et corporatifs</li>
            <li>Mariages d’envergure</li>
            <li>Villages, scènes, afters</li>
          </ul>
        </div>
        <div className="border border-chocolate/10 bg-card p-6 shadow-[0_24px_60px_rgba(26,16,12,0.08)] sm:p-8">
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}
