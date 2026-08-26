"use client";

import { useState } from "react";
import Link from "next/link";

import { useCart } from "@/components/cart-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";

export function AddToReservation({ product }: { product: Product }) {
  const { addItem, count } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="inline-flex h-14 items-center justify-center rounded-md bg-forest-bright px-8 text-[0.78rem] font-bold tracking-[0.16em] text-beige uppercase hover:bg-forest"
          onClick={() => {
            addItem(product.slug);
            setAdded(true);
          }}
        >
          {added ? "Ajouté à la réservation" : "Ajouter à la réservation"}
        </button>
        <Link
          href="/reservation"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-14 rounded-md border-chocolate-deep px-8 text-[0.78rem] font-bold tracking-[0.16em] text-chocolate-deep uppercase",
          )}
        >
          {added ? "Voir le panier" : `Réservation${count > 0 ? ` (${count})` : ""}`}
        </Link>
      </div>
      {added ? (
        <p className="text-sm font-medium text-forest">
          C’est dans le panier. Envoyez la réservation quand vous êtes prêt.
        </p>
      ) : null}
    </div>
  );
}
