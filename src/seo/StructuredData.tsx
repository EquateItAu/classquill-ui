import { Helmet } from "react-helmet-async";
import { BASE_URL, PRODUCT_NAME, PRODUCT_TAGLINE, LINKEDIN_URL } from "@/brand";
import type { LandingFaq } from "./faqs";

// Schema.org JSON-LD for the B2B landing, scoped to the B2B story (NOT the old
// B2C study app). Organization + WebSite are global; SoftwareApplication/Product,
// FAQPage and BreadcrumbList are opted in per page so each route describes only
// what is visibly on it. All url/@id values derive from a single BASE_URL
// (brand.ts).
//
// Honesty (the visible page must match the markup):
//  - The product node is multi-typed SoftwareApplication + Product so AI search
//    and Google recognise it as a product. Its `offers` is an AggregateOffer with
//    only a `lowPrice` — the real published entry price (US$20/mo, first tutor,
//    the same figure the Hero/pricing page show) — because pricing scales per
//    tutor and per active-student add-on, so there is no single price.
//  - NO `review`/`aggregateRating`: ClassQuill has no published customer reviews
//    yet, and fabricating them would violate Google's structured-data policy.
//    Add them here only once real, on-page reviews exist.

export interface Breadcrumb {
  name: string;
  path: string;
}

interface StructuredDataProps {
  /** Include the SoftwareApplication/Product node (product/feature pages, home, pricing). */
  software?: boolean;
  /**
   * FAQs visibly rendered on the page. When present, an FAQPage node is emitted
   * whose questions/answers mirror this exact array (the same source the on-page
   * <FAQ> renders from), so the markup can never drift from the visible copy.
   * Google retired FAQ *rich results* on 7 May 2026, but the markup still feeds
   * AI-search/LLM answer extraction (Strategy 2 of the AEO pass) — so we emit it.
   */
  faqs?: LandingFaq[];
  /** Include a BreadcrumbList — sub-pages pass their trail from home. */
  breadcrumbs?: Breadcrumb[];
}

const ORG_ID = `${BASE_URL}/#organization`;
const WEBSITE_ID = `${BASE_URL}/#website`;

const organizationNode = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: PRODUCT_NAME,
  url: BASE_URL,
  logo: `${BASE_URL}/classquill-logo.svg`,
  sameAs: [LINKEDIN_URL],
  description:
    "The operating system for tutoring businesses — scheduling, billing and payroll, plus a built-in learning platform with auto-marked practice and tutor review.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@classquill.com",
    contactType: "sales",
    areaServed: "AU",
  },
};

const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: PRODUCT_NAME,
  url: BASE_URL,
  publisher: { "@id": ORG_ID },
};

const softwareApplicationNode = {
  // Multi-typed so AI search + Google read it as a product, not just an app.
  "@type": ["SoftwareApplication", "Product"],
  name: PRODUCT_NAME,
  url: BASE_URL,
  brand: { "@id": ORG_ID },
  category: "Tutoring business management software",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    `${PRODUCT_NAME} is ${PRODUCT_TAGLINE.charAt(0).toLowerCase()}${PRODUCT_TAGLINE.slice(1)} ` +
    "Scheduling, billing and payroll, plus a built-in learning platform your tutors teach in: " +
    "set homework once, it's auto-marked with tutor review, and every result is visible to you and to parents.",
  audience: {
    "@type": "BusinessAudience",
    name: "Tutoring businesses",
  },
  // AggregateOffer with only lowPrice: the real published entry price (matches
  // the Hero + pricing page). Pricing scales per tutor and per active-student
  // add-on, so there is deliberately no single `price`.
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "20",
    priceCurrency: "USD",
    description:
      "From US$20/mo for your first tutor, US$6/mo each additional tutor. " +
      "Unlimited students are free; the optional AI Assistant add-on is priced per active user — same price for a student or a tutor.",
  },
};

export default function StructuredData({ software, faqs, breadcrumbs }: StructuredDataProps) {
  const graph: Record<string, unknown>[] = [organizationNode, websiteNode];

  if (software) graph.push(softwareApplicationNode);

  // FAQPage — mirrors the visibly-rendered FAQ (same `faqs` array the <FAQ>
  // component maps), so structured data can never drift from on-page copy.
  if (faqs && faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  if (breadcrumbs && breadcrumbs.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: `${BASE_URL}${b.path}`,
      })),
    });
  }

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });

  return (
    <Helmet>
      <script type="application/ld+json">{json}</script>
    </Helmet>
  );
}
