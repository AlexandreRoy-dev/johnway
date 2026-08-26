import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-chocolate-deep px-5 pt-28 pb-20 text-center text-beige">
      <p className="text-xs tracking-[0.3em] text-forest-bright uppercase">404</p>
      <h1 className="mt-3 font-display text-6xl font-bold uppercase">
        Page introuvable
      </h1>
      <p className="mt-4 max-w-md text-beige/70">
        Ce lien ne mène nulle part. Retour à l’accueil, au catalogue ou au devis.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center bg-forest-bright px-6 text-xs font-bold tracking-[0.16em] uppercase"
      >
        Accueil
      </Link>
    </div>
  );
}
