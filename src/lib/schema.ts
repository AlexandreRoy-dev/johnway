import { categoryLabel, products, type Product } from "@/lib/products";
import { absoluteUrl, assetUrl, SITE_URL } from "@/lib/seo";
import { site } from "@/lib/site";

const businessId = `${SITE_URL}/#business`;

function dayOffer(name: string, path: string, price: number, unitText: string) {
  return {
    "@type": "Offer",
    name,
    url: absoluteUrl(path),
    price,
    priceCurrency: "CAD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price,
      priceCurrency: "CAD",
      unitText,
    },
  };
}

/**
 * LocalBusiness + WebSite from facts published on the site.
 * Currency is CAD because prices are shown in dollars on a Québec site.
 * The site does not publish a street address, a city, a postal code,
 * a public phone number, a legal name, or social profiles.
 * TODO(Alexandre): add streetAddress, addressLocality, postalCode,
 * telephone, legalName and sameAs when those are confirmed.
 * Sunday hours are not stated, so they are omitted.
 */
export function siteGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": businessId,
        name: site.name,
        description: site.description,
        url: absoluteUrl("/"),
        image: assetUrl("/images/hero-poster.jpg"),
        email: site.email,
        address: {
          "@type": "PostalAddress",
          addressRegion: "Québec",
          addressCountry: "CA",
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Estrie" },
          { "@type": "AdministrativeArea", name: "Montérégie" },
          { "@type": "AdministrativeArea", name: "Centre-du-Québec" },
          { "@type": "City", name: "Montréal" },
          { "@type": "AdministrativeArea", name: "Québec" },
        ],
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "08:00",
          closes: "18:00",
        },
        knowsLanguage: "fr-CA",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Matériel événementiel",
          itemListElement: products.map((product) =>
            dayOffer(
              product.name,
              `/produits/${product.slug}`,
              product.pricePerDay,
              "jour",
            ),
          ),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: absoluteUrl("/"),
        name: site.name,
        description: site.description,
        inLanguage: "fr-CA",
        publisher: { "@id": businessId },
      },
    ],
  };
}

function breadcrumbList(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    ...breadcrumbList(items),
  };
}

export function productJsonLd(product: Product) {
  const url = absoluteUrl(`/produits/${product.slug}`);
  const offers = [
    dayOffer(product.name, `/produits/${product.slug}`, product.pricePerDay, "jour"),
  ];
  if (product.weekendPrice) {
    offers.push(
      dayOffer(
        `${product.name}, week-end`,
        `/produits/${product.slug}`,
        product.weekendPrice,
        "week-end",
      ),
    );
  }
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: assetUrl(product.image),
        category: categoryLabel[product.category],
        brand: { "@type": "Brand", name: site.name },
        offers: offers.length === 1 ? offers[0] : offers,
        seller: { "@id": businessId },
        url,
      },
      breadcrumbList([
        { name: "Accueil", path: "/" },
        { name: "Matériel", path: "/produits" },
        { name: product.name, path: `/produits/${product.slug}` },
      ]),
    ],
  };
}
