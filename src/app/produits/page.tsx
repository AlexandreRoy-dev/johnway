"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import { categories, products, type ProductCategory } from "@/lib/products";

export default function ProduitsPage() {
  const [filter, setFilter] = useState<ProductCategory | "all">("all");
  const list = useMemo(
    () =>
      filter === "all"
        ? products
        : products.filter((product) => product.category === filter),
    [filter],
  );

  return (
    <div className="bg-cream pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs font-bold tracking-[0.32em] text-forest uppercase">
          Catalogue
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.8rem,7vw,6rem)] leading-[0.88] font-bold text-chocolate-deep uppercase">
          Matériel.
          <span className="block text-forest">Prix affichés.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">
          Tarifs particuliers, à la journée. Pour un festival, un mariage
          d’entreprise ou un site municipal, demandez un devis — on assemble le
          projet.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setFilter(category.id)}
              className={`h-10 rounded-md px-4 text-[0.7rem] font-bold tracking-[0.14em] uppercase ${
                filter === category.id
                  ? "bg-chocolate-deep text-beige"
                  : "border border-chocolate/20 bg-card text-chocolate hover:border-forest"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        {list.length === 0 ? (
          <p className="mt-16 text-muted-foreground">Aucun produit dans cette catégorie.</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((product) => (
              <Link
                key={product.slug}
                href={`/produits/${product.slug}`}
                className="group overflow-hidden bg-card shadow-[0_16px_40px_rgba(26,16,12,0.07)]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <Badge className="absolute top-3 left-3">
                    {product.installIncluded ? "Install. incluse" : "Option install."}
                  </Badge>
                </div>
                <div className="p-5">
                  <p className="text-[0.68rem] tracking-[0.16em] text-gold uppercase">
                    {product.tagline}
                  </p>
                  <h2 className="mt-1 font-display text-3xl font-bold text-chocolate-deep uppercase">
                    {product.name}
                  </h2>
                  <p className="mt-4 font-display text-4xl font-bold text-forest">
                    {formatPrice(product.pricePerDay)}
                    <span className="ml-1 text-sm font-medium text-muted-foreground">
                      / jour
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
