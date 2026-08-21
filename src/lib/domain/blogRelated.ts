import type { BlogPostMeta } from "@/content/blog/types";

/**
 * Pick the posts most related to `current` from `all`, ranked by tag overlap,
 * then FILLED to `limit` with the most-recent remaining posts when tag matches
 * run short.
 *
 * Ranking: most shared tags first; ties broken by newest `date`. If fewer than
 * `limit` posts share a tag, the remainder is topped up with the newest
 * non-matching posts so the "Read next" module never silently disappears just
 * because tags don't overlap. The current post is always excluded. Returns
 * fewer than `limit` only when there genuinely aren't enough other posts.
 *
 * Mirrors the edge function's `relatedWithFallback` (supabase/functions/
 * _shared/blogRender.ts) so tenant SSR and the first-party marketing blog
 * behave identically.
 */
export function getRelatedPosts(
  current: BlogPostMeta,
  all: BlogPostMeta[],
  limit = 3
): BlogPostMeta[] {
  const currentTags = new Set(current.tags);

  const candidates = all
    .filter((post) => post.slug !== current.slug)
    .map((post) => ({
      post,
      overlap: post.tags.reduce(
        (count, tag) => (currentTags.has(tag) ? count + 1 : count),
        0
      ),
    }))
    .sort((a, b) => {
      // Tag-matched posts first (by shared-tag count), then everything else;
      // newest date breaks ties within each band (ISO yyyy-mm-dd sorts lexically).
      if (b.overlap !== a.overlap) return b.overlap - a.overlap;
      return b.post.date.localeCompare(a.post.date);
    });

  return candidates.slice(0, limit).map(({ post }) => post);
}
