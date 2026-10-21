import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { ProduitsCatalog } from "@/components/produits-catalog";
import { breadcrumbJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/produits",
  title: "Produits",
  description:
    "Tarifs particuliers, à la journée. Pour un festival, un mariage d’entreprise ou un site municipal, demandez un devis : on assemble le projet.",
});

export default function ProduitsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Matériel", path: "/produits" },
        ])}
      />
      <ProduitsCatalog />
    </>
  );
}
