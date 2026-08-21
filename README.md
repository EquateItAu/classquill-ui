# @classquill/ui

Shared design system, brand config, and SEO primitives for `classquill.com` (marketing,
`classquill-landing` repo) and `app.classquill.com` (product, `UI_Refresh` repo) — extracted from
the monorepo so both can consume one source instead of drifting copies.

**Deliberately presentational only.** No auth, no Supabase client, no data-fetching services.
Both consuming repos get their own trivial `supabaseClient.ts` and, where needed, their own
minimal auth-check hook — see the extraction plan (Obsidian:
`2 - ClassQuill (TMS)/ClassQuill Landing — Standalone Repo Extraction Plan.md`) for why.

## What's in here

- **Design system** — `components/ui/*` (button, input, select, badge, skeleton, etc.)
- **`brand.ts` / `regions.ts`** — product name, tagline, pricing, hreflang/region config
- **SEO** — `SEOHead`, `LandingSEOHead`, `StructuredData`, `faqs`
- **Small lib utilities** — `cn`, analytics/Sentry wrappers, gdpr consent, phone formatting,
  layout-config, blog-related-posts helper

## What's deliberately NOT here

- `AuthContext`/`AuthProvider` — too heavy for a UI package; consumers get a minimal session-check hook instead
- `supabaseClient.ts` — public config (URL + anon key), safe and trivial to duplicate per-repo
- `publicTutorDirectoryService` (tutor directory) — stays app-only; `/tutors/*` is proxied at the
  Cloudflare edge to the live app, the same pattern already used for `/blog/*`

## Consuming this package

Both consuming apps use Tailwind, and this package ships raw `className="..."` strings, not
compiled CSS — **the consumer's Tailwind config must scan this package's dist output**, e.g. add
`node_modules/@classquill/ui/dist/**/*.js` to the `content`/`@source` scan paths, or the utility
classes used inside these components won't generate.

```bash
npm install @classquill/ui
```

```ts
import { Button, cn, PRODUCT_NAME } from "@classquill/ui";
```

## Build

```bash
npm install
npm run typecheck   # tsc --noEmit
npm run build        # tsup -> dist/ (ESM + .d.ts)
```

## Publishing

Published to GitHub Packages (`https://npm.pkg.github.com`) under the `EquateItAu` org. Bump
`version` in `package.json`, then `npm publish`. See the extraction plan for the full picture —
this package is one piece of splitting `classquill-landing` out of the `UI_Refresh` monorepo.
