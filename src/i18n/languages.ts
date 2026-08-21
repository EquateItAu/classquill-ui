// Supported languages registry — single source of truth for the switcher UI,
// validation, and lazy-chunk filenames.

export type SupportedLanguageCode = 'en' | 'de' | 'es' | 'fr' | 'nl';

export interface Language {
  code: SupportedLanguageCode;
  label: string;
  flag: string;
  /** ISO 3166-1 alpha-2 country code for the flag-icons package (`fi fi-<flagCountry>`). */
  flagCountry: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', label: 'English',    flag: '🇬🇧', flagCountry: 'gb' },
  { code: 'de', label: 'Deutsch',    flag: '🇩🇪', flagCountry: 'de' },
  { code: 'es', label: 'Español',    flag: '🇪🇸', flagCountry: 'es' },
  { code: 'fr', label: 'Français',   flag: '🇫🇷', flagCountry: 'fr' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱', flagCountry: 'nl' },
];

export const SUPPORTED_CODES: readonly SupportedLanguageCode[] = SUPPORTED_LANGUAGES.map((l) => l.code);

/** Returns true if `code` is a supported language code. */
export function isSupportedLanguage(code: string): code is SupportedLanguageCode {
  return (SUPPORTED_CODES as readonly string[]).includes(code);
}
