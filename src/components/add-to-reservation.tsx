"use client";

import { useState } from "react";
import Link from "next/link";

import { useCart } from "@/components/cart-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";

export function AddToReservation({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button
        type="button"
        className="h-14 rounded-md bg-forest-bright px-8 text-[0.78rem] font-bold tracking-[0.16em] uppercase hover:bg-forest"
        onClick={() => {
          addItem(product.slug);
          setAdded(true);
        }}
      >
        {added ? "Ajouté à la réservation" : "Ajouter à la réservation"}
      </Button>
      {added ? (
        <Link
          href="/reservation"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-14 rounded-md border-chocolate-deep px-8 text-[0.78rem] font-bold tracking-[0.16em] text-chocolate-deep uppercase",
          )}
        >
          Voir le panier
        </Link>
      ) : null}
    </div>
  );
}
