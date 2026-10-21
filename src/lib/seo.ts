import type { Metadata } from "next";

import { site } from "@/lib/site";

export const SITE_URL = "https://johnway.ca";

const TITLE_SEPARATOR = "\u00B7";
const DEFAULT_IMAGE = "/images/hero-poster.jpg";
const DEFAULT_IMAGE_ALT = "Camion Johnway en route";

export function absoluteUrl(path: string) {
  if (!path || path === "/") return `${SITE_URL}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const withSlash = normalized.endsWith("/") ? normalized : `${normalized}/`;
  return `${SITE_URL}${withSlash}`;
}

export function assetUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function brandedTitle(title?: string) {
  if (!title) return `${site.name} ${TITLE_SEPARATOR} ${site.tagline}`;
  return `${title} ${TITLE_SEPARATOR} ${site.name}`;
}

/** Keep an existing description, dropping whole sentences once it passes `max`. */
export function shortenDescription(text: string, max = 160) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  const sentences = normalized.split(/(?<=\.)\s+/);
  let out = "";
  for (const sentence of sentences) {
    const next = out ? `${out} ${sentence}` : sentence;
    if (next.length > max) break;
    out = next;
  }
  return out || normalized;
}

export function pageMetadata({
  path,
  title,
  description,
  image = DEFAULT_IMAGE,
  imageAlt = DEFAULT_IMAGE_ALT,
}: {
  path: string;
  title?: string;
  description: string;
  image?: string;
  imageAlt?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = brandedTitle(title);
  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical: url,
      languages: {
        "fr-CA": url,
        "x-default": url,
      },
    },
    openGraph: {
      type: "website",
      locale: "fr_CA",
      siteName: site.name,
      url,
      title: fullTitle,
      description,
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
