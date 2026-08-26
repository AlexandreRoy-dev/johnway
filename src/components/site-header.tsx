"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/logo";
import { useCart } from "@/components/cart-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/produits", label: "Matériel" },
  { href: "/#a-propos", label: "À propos" },
  { href: "/#temoignages", label: "Témoignages" },
  { href: "/devis", label: "Devis" },
];

export function SiteHeader() {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open
          ? "bg-chocolate-deep/95 shadow-[0_12px_40px_rgba(26,16,12,0.35)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" aria-label="Johnway, accueil">
          <Logo invert />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.72rem] font-semibold tracking-[0.18em] text-beige/80 uppercase transition-colors hover:text-beige"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/reservation"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "relative h-11 rounded-md px-4 text-beige hover:bg-white/10 hover:text-beige",
            )}
          >
            Réservation
            {count > 0 ? (
              <span className="ml-2 inline-flex size-5 items-center justify-center rounded-full bg-forest-bright text-[0.65rem] font-bold text-beige">
                {count}
              </span>
            ) : null}
          </Link>
          <Link
            href="/devis"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-11 rounded-md bg-forest-bright px-5 text-[0.72rem] font-bold tracking-[0.16em] text-beige uppercase hover:bg-forest",
            )}
          >
            Devis événement
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center text-beige lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/10 bg-chocolate-deep px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl tracking-wide text-beige uppercase"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/reservation"
              onClick={() => setOpen(false)}
              className="font-display text-3xl tracking-wide text-forest-bright uppercase"
            >
              Réservation {count > 0 ? `(${count})` : ""}
            </Link>
            <Link
              href="/devis"
              onClick={() => setOpen(false)}
              className={cn(
                buttonVariants({ variant: "default" }),
                "mt-2 h-12 rounded-md bg-forest-bright text-[0.8rem] font-bold tracking-[0.16em] uppercase",
              )}
            >
              Devis événement
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
