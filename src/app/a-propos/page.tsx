import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos",
  description: site.description,
};

export default function AboutPage() {
  return (
    <div className="bg-cream pt-28 pb-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <p className="text-xs font-bold tracking-[0.32em] text-forest uppercase">
          À propos
        </p>
        <h1 className="mt-3 max-w-4xl font-display text-[clamp(2.8rem,7vw,6rem)] leading-[0.88] font-bold text-chocolate-deep uppercase">
          On ne loue pas
          <span className="block">des affaires.</span>
          <span className="block text-forest">On livre une soirée.</span>
        </h1>
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="relative min-h-[22rem] overflow-hidden">
            <Image
              src="/images/truck.jpg"
              alt="Camion Johnway en route"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div className="text-lg leading-relaxed text-chocolate/90">
            <p>
              Johnway est née du terrain : trop d’événements coincés entre un
              fournisseur de tentes, un autre pour la sono, un troisième pour
              l’animation. On a fermé la boucle.
            </p>
            <p className="mt-4">
              Location, installation, coordination, animation. Un convoi, une
              équipe, un responsable. On connaît la fête, et on connaît le vent,
              la boue, le 30 ampères qui saute à 22 h 40.
            </p>
            <p className="mt-4">
              Basés en Estrie, on roule partout au Québec. Festivals, mariages,
              corporatifs, municipal. Clé en main, sans théâtre.
            </p>
            <Link
              href="/devis"
              className="mt-8 inline-flex h-14 items-center bg-forest-bright px-8 text-[0.78rem] font-bold tracking-[0.16em] text-beige uppercase"
            >
              Parler d’un projet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
