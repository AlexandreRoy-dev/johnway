import type { MetadataRoute } from "next";

import { products } from "@/lib/products";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const paths = [
  "/",
  "/produits",
  "/a-propos",
  "/contact",
  "/devis",
  "/reservation",
  ...products.map((product) => `/produits/${product.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: absoluteUrl(path),
  }));
}
