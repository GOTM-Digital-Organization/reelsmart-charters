import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  keywords?: string;
  jsonLd?: object | object[];
}

const SITE_NAME = "Reel Smart Charters";
const BASE_URL = "https://www.reelsmartcharters.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/hero-boat.jpeg`;

export default function SEOHead({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  keywords,
  jsonLd,
}: SEOHeadProps) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${BASE_URL}${canonical}`;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Helper to set/create a meta tag
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    // Standard meta
    setMeta('meta[name="description"]', "content", description);
    if (keywords) setMeta('meta[name="keywords"]', "content", keywords);
    setMeta('meta[name="robots"]', "content", "index, follow");

    // Open Graph
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[property="og:image"]', "content", ogImage);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:site_name"]', "content", SITE_NAME);

    // Twitter Card
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", ogImage);

    // Canonical
    let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.rel = "canonical";
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.href = canonicalUrl;

    // JSON-LD structured data — support single object or array of objects
    document.querySelectorAll('script[data-rsc="jsonld"]').forEach(el => el.remove());
    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      schemas.forEach((schema, i) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-rsc", "jsonld");
        script.setAttribute("data-rsc-index", String(i));
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      });
    }
  }, [fullTitle, description, canonicalUrl, ogImage, keywords, jsonLd]);

  return null;
}

// ── Shared JSON-LD schemas ─────────────────────────────────────────────────────

export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "TouristAttraction"],
  name: "Reel Smart Charters",
  description:
    "Premium inshore and nearshore fishing charters in the back bays, mangroves, and coastal waters of Southwest Florida. USCG licensed Captain Jon.",
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo.png`,
  image: DEFAULT_OG_IMAGE,
  telephone: "+19417025895",
  email: "Fish@reelsmartcharters.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1059 N Tamiami Trl",
    addressLocality: "Sarasota",
    addressRegion: "FL",
    postalCode: "34236",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 27.3364,
    longitude: -82.5307,
  },
  areaServed: [
    { "@type": "City", name: "Sarasota" },
    { "@type": "City", name: "Bradenton" },
    { "@type": "City", name: "Venice" },
  ],
  openingHours: "Mo-Su 05:00-20:00",
  priceRange: "$$",
  sameAs: [
    "https://www.facebook.com/reelsmartcharters",
    "https://www.instagram.com/reelsmartcharters",
  ],
};
