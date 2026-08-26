import Link from "next/link";

import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-chocolate-deep text-beige">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Logo invert />
          <p className="mt-5 max-w-md text-lg leading-relaxed text-beige/75">
            Location, installation, animation. Un seul interlocuteur pour que
            votre festival, mariage ou gala tienne debout — et claque.
          </p>
          <p className="mt-4 text-sm text-gold">
            Compagnie sœur de{" "}
            <a
              href={site.sister.url}
              className="underline decoration-forest-bright underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              {site.sister.name}
            </a>
          </p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-forest-bright uppercase">
            Navigation
          </p>
          <ul className="mt-4 space-y-2 text-beige/80">
            <li>
              <Link href="/#services" className="hover:text-beige">
                Services
              </Link>
            </li>
            <li>
              <Link href="/produits" className="hover:text-beige">
                Matériel & prix
              </Link>
            </li>
            <li>
              <Link href="/devis" className="hover:text-beige">
                Devis entreprise
              </Link>
            </li>
            <li>
              <Link href="/reservation" className="hover:text-beige">
                Réservation particulier
              </Link>
            </li>
            <li>
              <Link href="/a-propos" className="hover:text-beige">
                À propos
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-beige">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-forest-bright uppercase">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-beige/80">
            <li>{site.region}</li>
            <li>{site.serviceArea}</li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-beige">
                {site.email}
              </a>
            </li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs tracking-wide text-beige/50 sm:flex-row sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Johnway. Tous droits réservés.</p>
          <p>Événementiel clé en main · Québec</p>
        </div>
      </div>
    </footer>
  );
}
