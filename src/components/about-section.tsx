import Image from "next/image";

import { AnimateIn } from "@/components/animate-in";
import { site } from "@/lib/site";

const stats = [
  { value: "1", label: "interlocuteur" },
  { value: "12h", label: "pour lever un site" },
  { value: "QC", label: "partout au Québec" },
];

export function AboutSection() {
  return (
    <section id="a-propos" className="bg-beige py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <AnimateIn>
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/images/equipe.jpg"
              alt="L’équipe Johnway en opération"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-chocolate-deep/70 to-transparent" />
            <p className="absolute bottom-6 left-6 font-display text-3xl font-bold text-beige uppercase">
              Estrie. Québec.
              <span className="block text-forest-bright">On roule.</span>
            </p>
          </div>
        </AnimateIn>
        <div>
          <AnimateIn>
            <p className="text-xs font-bold tracking-[0.32em] text-forest uppercase">
              À propos
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.9] font-bold text-chocolate-deep uppercase">
              Une entreprise
              <span className="block">d’événementiel.</span>
              <span className="block text-forest">Pas un garage.</span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-chocolate/90">
              Johnway livre, installe et orchestre. Chapiteaux, tentes, speakers,
              planchers, lumière — et l’équipe qui fait tenir le tout. Festivals,
              mariages, galas, sites municipaux : on prend le projet, on le pose
              au sol, on le rend spectaculaire.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Compagnie sœur de {site.sister.name}. Même exigence, même sens de
              la fête — un bras opérationnel pour que la soirée ait un toit, un
              son, et quelqu’un qui sait ce qu’il fait.
            </p>
          </AnimateIn>
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-chocolate/15 pt-8">
            {stats.map((stat, index) => (
              <AnimateIn key={stat.label} delay={0.1 * index}>
                <p className="font-display text-4xl font-bold text-forest sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs tracking-[0.12em] text-chocolate uppercase">
                  {stat.label}
                </p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
