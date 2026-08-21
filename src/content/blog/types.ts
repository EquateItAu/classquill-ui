/** Which brand's public marketing blog a post belongs to. */
export type BlogBrand = "classquill" | "equateit";

/** Author social links — the platform set is variable over time, so this is a
 *  loose bag rather than fixed columns. */
export interface AuthorSocialLinks {
  twitter?: string;
  linkedin?: string;
  website?: string;
}

/** One author of a post — either an internal team member (profileId set, with a
 *  resolved profile + author_profiles row) or a lightweight guest credit. */
export interface BlogAuthor {
  profileId: string | null;
  guestName: string | null;
  guestAvatarUrl: string | null;
  displayOrder: number;
  /** Resolved from profiles (internal authors only). */
  fullName: string | null;
  avatarUrl: string | null;
  /** author_profiles.slug — internal authors only; drives /blog/author/<slug>. */
  slug: string | null;
  bio: string | null;
  socialLinks: AuthorSocialLinks;
}

export interface BlogPostMeta {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  /** Denormalised primary-author display name — cache + fallback when `authors`
   *  is empty (legacy/unmigrated posts). */
  author: string;
  /** Ordered authors (display_order asc; index 0 = primary). May be empty. */
  authors: BlogAuthor[];
  tags: string[];
  featuredImage?: string;
  status: "draft" | "published";
  brand: BlogBrand;
  scheduledAt?: string;
  /** Overrides for <title>/<meta description> — decoupled from the editorial
   *  title/excerpt shown as the H1/teaser, which can run longer than an ideal
   *  SEO title/description. Falls back to title/excerpt when unset. */
  metaTitle?: string;
  metaDescription?: string;
  /** Canonical URL override for syndicated copies; unset ⇒ self-canonical. */
  canonicalUrl?: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
  createdAt: string;
  updatedAt: string;
}
