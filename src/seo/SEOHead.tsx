import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
  /** Brand name for the title suffix + og:site_name. Defaults to EquateIt (the B2C app). */
  siteName?: string;
  /** Canonical / OG base URL. Defaults to equateit.com.au; ClassQuill pages pass classquill.com. */
  baseUrl?: string;
  /** `<html lang>` — region locale (e.g. "en-AU"). Omitted → not set. */
  htmlLang?: string;
  /** og:locale — defaults to en_AU (the historical hardcoded value). */
  ogLocale?: string;
  /** hreflang alternates (region siblings + x-default). See landing/regions.ts. */
  alternates?: { hreflang: string; href: string }[];
}

const DEFAULT_SITE_NAME = "EquateIt";
const DEFAULT_BASE_URL = "https://equateit.com.au";

export default function SEOHead({
  title,
  description,
  path = "/",
  ogImage,
  noIndex = false,
  siteName = DEFAULT_SITE_NAME,
  baseUrl = DEFAULT_BASE_URL,
  htmlLang,
  ogLocale = "en_AU",
  alternates,
}: SEOHeadProps) {
  const fullTitle = title
    ? title.includes(siteName)
      ? title
      : `${title} | ${siteName}`
    : `${siteName} | Maths & Science Tutoring for Years 7–12`;
  // Canonical/OG URL must use the trailing-slash form the host serves —
  // non-slashed paths 308-redirect, so a non-slashed canonical points at a
  // redirect. Root "/" already ends in a slash and is left as-is.
  const canonicalPath = path.endsWith("/") ? path : `${path}/`;
  const canonicalUrl = `${baseUrl}${canonicalPath}`;
  const resolvedOgImage = ogImage ?? `${baseUrl}/og-image.png`;

  return (
    <Helmet>
      {htmlLang && <html lang={htmlLang} />}
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* hreflang region alternates (published regions + x-default) */}
      {alternates?.map((alt) => (
        <link key={alt.hreflang} rel="alternate" hrefLang={alt.hreflang} href={alt.href} />
      ))}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={resolvedOgImage} />
    </Helmet>
  );
}
