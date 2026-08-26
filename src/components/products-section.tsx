import Image from "next/image";
import Link from "next/link";

import { AnimateIn } from "@/components/animate-in";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import { featuredProducts } from "@/lib/products";

export function ProductsSection() {
  const items = featuredProducts().slice(0, 6);

  return (
    <section id="materiel" className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <AnimateIn>
            <p className="text-xs font-bold tracking-[0.32em] text-forest uppercase">
              Prix au détail
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.9] font-bold text-chocolate-deep uppercase">
              Le matériel.
              <span className="block text-forest">Les vrais prix.</span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="max-w-sm text-muted-foreground">
              Pour les particuliers : tarif journalier, fiche produit, réservation
              en ligne. Pour les entreprises : un devis d’événement, pas une
              addition de lignes.
            </p>
          </AnimateIn>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product, index) => (
            <AnimateIn key={product.slug} delay={index * 0.08}>
              <Link
                href={`/produits/${product.slug}`}
                className="group block overflow-hidden bg-card shadow-[0_20px_50px_rgba(26,16,12,0.08)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <Badge className="absolute top-3 left-3">
                    {product.installIncluded ? "Install. incluse" : "Self + option"}
                  </Badge>
                </div>
                <div className="p-5">
                  <p className="text-[0.68rem] tracking-[0.16em] text-gold uppercase">
                    {product.tagline}
                  </p>
                  <h3 className="mt-1 font-display text-3xl font-bold text-chocolate-deep uppercase">
                    {product.name}
                  </h3>
                  <p className="mt-4 flex items-baseline gap-1 font-display text-4xl font-bold text-forest">
                    {formatPrice(product.pricePerDay)}
                    <span className="text-sm font-medium tracking-normal text-muted-foreground">
                      / jour
                    </span>
                  </p>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/produits"
            className="inline-flex h-14 items-center justify-center rounded-md bg-chocolate-deep px-8 text-[0.78rem] font-bold tracking-[0.18em] text-beige uppercase hover:bg-chocolate"
          >
            Tout le catalogue
          </Link>
          <Link
            href="/devis"
            className="inline-flex h-14 items-center justify-center rounded-md border border-chocolate-deep px-8 text-[0.78rem] font-bold tracking-[0.18em] text-chocolate-deep uppercase hover:bg-chocolate-deep hover:text-beige"
          >
            Devis événement entreprise
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
