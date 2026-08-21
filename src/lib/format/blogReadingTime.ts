const WORDS_PER_MINUTE = 200;

/**
 * Estimate reading time for a post body, in whole minutes.
 *
 * Counts whitespace-separated words and divides by an average adult reading
 * speed (~200 wpm), rounded to the nearest minute with a floor of 1 — even a
 * one-line post reads as "1 min read", never "0".
 */
export function getReadingTimeMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
