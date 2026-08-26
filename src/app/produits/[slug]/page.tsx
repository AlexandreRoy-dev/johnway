import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { AddToReservation } from "@/components/add-to-reservation";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import { categoryLabel, getProduct, products } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Produit" };
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="bg-cream pt-28 pb-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:px-8">
        <div className="relative aspect-[4/3] overflow-hidden bg-chocolate-deep">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.28em] text-forest uppercase">
            {categoryLabel[product.category]}
          </p>
          <h1 className="mt-2 font-display text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.9] font-bold text-chocolate-deep uppercase">
            {product.name}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">{product.tagline}</p>
          <p className="mt-6 font-display text-6xl font-bold text-forest">
            {formatPrice(product.pricePerDay)}
            <span className="ml-2 text-lg font-medium text-muted-foreground">
              / jour
            </span>
          </p>
          {product.weekendPrice ? (
            <p className="mt-1 text-sm text-chocolate">
              Week-end (ven. au dim.) : {formatPrice(product.weekendPrice)}
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge>{product.installNote}</Badge>
            {product.capacity ? (
              <Badge variant="gold">{product.capacity}</Badge>
            ) : null}
            {product.size ? <Badge variant="beige">{product.size}</Badge> : null}
          </div>
          <p className="mt-6 leading-relaxed text-chocolate/90">
            {product.description}
          </p>
          <div className="mt-8">
            <AddToReservation product={product} />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Entreprise, festival, municipal ?{" "}
            <Link href="/devis" className="font-semibold text-forest underline">
              Demandez un devis d’événement
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-7xl gap-8 px-5 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="font-display text-2xl font-bold text-chocolate-deep uppercase">
            Inclus
          </h2>
          <ul className="mt-3 space-y-2 text-chocolate/85">
            {product.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-chocolate-deep uppercase">
            Fiche technique
          </h2>
          <dl className="mt-3 space-y-2">
            {product.specs.map((spec) => (
              <div key={spec.label} className="flex justify-between gap-4 border-b border-chocolate/10 py-2 text-sm">
                <dt className="text-muted-foreground">{spec.label}</dt>
                <dd className="text-right font-medium text-chocolate-deep">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-chocolate-deep uppercase">
            Options
          </h2>
          <ul className="mt-3 space-y-2">
            {product.options.map((option) => (
              <li key={option.name} className="flex justify-between gap-4 text-sm">
                <span>{option.name}</span>
                <span className="font-semibold text-forest">{option.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {related.length > 0 ? (
        <div className="mx-auto mt-20 max-w-7xl px-5 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-chocolate-deep uppercase">
            Dans la même famille
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/produits/${item.slug}`} className="bg-card">
                <div className="relative aspect-[16/10]">
                  <Image src={item.image} alt="" fill className="object-cover" sizes="33vw" />
                </div>
                <div className="p-4">
                  <p className="font-display text-xl font-bold uppercase">{item.name}</p>
                  <p className="text-forest">{formatPrice(item.pricePerDay)} / jour</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
