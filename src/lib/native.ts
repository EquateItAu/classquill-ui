import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import { MOBILE_BREAKPOINT } from '@/hooks/platform/use-mobile';

function isIPadWeb(): boolean {
  // Modern iPads spoof 'MacIntel' UA but expose touch points > 1
  return /iPad/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

/** Returns the device class for UI/UX decisions. Stable for the lifetime of a page load. */
export function getDeviceClass(): 'mobile' | 'tablet' | 'desktop' {
  const platform = Capacitor.getPlatform() as 'android' | 'ios' | 'web'
  if (platform === 'android') return 'mobile'
  if (platform === 'ios') return window.innerWidth >= MOBILE_BREAKPOINT ? 'tablet' : 'mobile'
  // Web
  if (isIPadWeb()) return 'tablet'
  if (window.innerWidth < MOBILE_BREAKPOINT) return 'mobile'
  return 'desktop'
}

/** Returns true when running inside a native Capacitor shell (Android/iOS). */
export function isNative(): boolean {
  return Capacitor.isNativePlatform();
}

/** Returns the current platform: 'android', 'ios', or 'web'. */
export function getPlatform(): 'android' | 'ios' | 'web' {
  return Capacitor.getPlatform() as 'android' | 'ios' | 'web';
}

/**
 * Opens an external URL. On native uses @capacitor/browser (Chrome Custom Tabs / SFSafariViewController)
 * so the URL opens in the system browser with proper cookie/auth support. On web falls back to window.open.
 */
export async function openExternalUrl(url: string): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    await Browser.open({ url });
  } else {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
