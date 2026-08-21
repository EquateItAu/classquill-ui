import type { ComponentProps } from "react";
import SEOHead from "./SEOHead";
import { BASE_URL, PRODUCT_NAME } from "@/brand";
import {
  DEFAULT_REGION,
  getRegion,
  hreflangAlternates,
} from "@/regions";

// SEOHead bound to the ClassQuill brand (brand.ts). EVERY B2B marketing page must
// render its head through this wrapper, never <SEOHead> directly: SEOHead defaults
// to EquateIt + equateit.com.au for the shared B2C blog/policy pages, so a raw
// <SEOHead> on a ClassQuill page emits the wrong brand + a cross-domain canonical.
//
// Region SEO (regions.ts): emits <html lang>, og:locale and hreflang alternates.
// Today only the default region (AU) is published, so alternates = en-AU + x-default;
// UK/US join automatically when their `published` flag flips. A page can still
// override htmlLang/ogLocale/alternates explicitly once real per-region routes exist.
type Props = Omit<ComponentProps<typeof SEOHead>, "siteName" | "baseUrl">;

export default function LandingSEOHead(props: Props) {
  const region = getRegion(DEFAULT_REGION);
  return (
    <SEOHead
      htmlLang={region.htmlLang}
      ogLocale={region.ogLocale}
      // noindex pages get no hreflang — alternates pointing at noindexed
      // URLs send search engines a mixed signal.
      alternates={props.noIndex ? undefined : hreflangAlternates(props.path ?? "/")}
      {...props}
      siteName={PRODUCT_NAME}
      baseUrl={BASE_URL}
    />
  );
}
