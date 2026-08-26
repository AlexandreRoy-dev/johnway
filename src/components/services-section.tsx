import Image from "next/image";
import Link from "next/link";

import { AnimateIn } from "@/components/animate-in";

const services = [
  {
    n: "01",
    title: "Location",
    text: "Chapiteaux, tentes, sono, scène, mobilier, lumière, génératrices. Du kiosque 3×3 au village festival.",
    image: "/images/tent-exterieur.jpg",
  },
  {
    n: "02",
    title: "Installation",
    text: "On arrive en convoi. On ancre, on câble, on aligne. Le lendemain, on reprend. Vous ne soulevez rien.",
    image: "/images/truck.jpg",
  },
  {
    n: "03",
    title: "Clé en main",
    text: "Un interlocuteur. Un devis. Un site qui tient. Mariage, corporatif, municipal : on porte le projet.",
    image: "/images/tables.jpg",
  },
  {
    n: "04",
    title: "Animation",
    text: "DJ, danse, ambiance. On ne livre pas que du matériel : on livre la soirée.",
    image: "/images/festival.jpg",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-chocolate-deep py-24 text-beige">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <AnimateIn>
          <p className="text-xs font-bold tracking-[0.32em] text-forest-bright uppercase">
            Services
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.9] font-bold uppercase">
            Pas un catalogue.
            <span className="block text-gold">Une opération.</span>
          </h2>
        </AnimateIn>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((service, index) => (
            <AnimateIn key={service.n} delay={index * 0.12}>
              <article className="group relative min-h-[22rem] overflow-hidden">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate-deep via-chocolate-deep/55 to-black/10" />
                <div className="relative flex h-full min-h-[22rem] flex-col justify-end p-7">
                  <span className="font-display text-5xl font-bold text-forest-bright">
                    {service.n}
                  </span>
                  <h3 className="mt-2 font-display text-4xl font-bold uppercase">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-md text-beige/85">{service.text}</p>
                </div>
              </article>
            </AnimateIn>
          ))}
        </div>
        <AnimateIn className="mt-10">
          <Link
            href="/devis"
            className="inline-flex h-14 items-center rounded-md bg-forest-bright px-8 text-[0.78rem] font-bold tracking-[0.18em] text-beige uppercase hover:bg-forest"
          >
            Lancer un événement
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
