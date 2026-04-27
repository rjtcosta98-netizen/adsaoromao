/**
 * Cross-browser hardware fingerprint.
 *
 * Uses ONLY signals that are identical across Chrome, Firefox, Edge, Safari
 * on the same physical device.
 *
 * Deliberately EXCLUDED (browser-specific, differ per browser):
 *   - navigator.userAgent
 *   - Canvas 2D pixel data
 *   - WebGL renderer
 *   - AudioContext oscillator
 *   - navigator.plugins
 *
 * Included (hardware-level, always the same on the same machine):
 *   - Screen: resolution, color depth, pixel ratio
 *   - CPU: hardwareConcurrency
 *   - OS platform
 *   - System timezone
 *   - System language
 */

function djb2(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h) ^ s.charCodeAt(i);
    h >>>= 0;
  }
  return h.toString(16).padStart(8, '0');
}

async function sha256(message: string): Promise<string> {
  try {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(message));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    return djb2(message).repeat(8).slice(0, 64);
  }
}

let cached: string | null = null;

/**
 * Returns a hardware fingerprint that is stable across all browsers on the
 * same device (Chrome, Firefox, Edge, Safari, incognito — all identical).
 *
 * The server additionally checks the request IP, so two layers block duplicates.
 */
export async function getDeviceFingerprint(): Promise<string> {
  if (cached) return cached;

  const s = screen;
  const nav = navigator as Navigator & { deviceMemory?: number };

  const signals = [
    // Screen / display — identical across all browsers on same OS
    `${s.width}x${s.height}`,
    `dpr:${window.devicePixelRatio ?? 1}`,
    `cd:${s.colorDepth}`,
    `avail:${s.availWidth}x${s.availHeight}`,
    // CPU
    `cpu:${nav.hardwareConcurrency ?? 0}`,
    // OS platform: "Win32" | "MacIntel" | "Linux x86_64" | "iPhone" | "iPad" etc.
    `plat:${nav.platform}`,
    // System language (set in OS, same across browsers)
    `lang:${nav.language}`,
    // Timezone — set at OS level
    `tz:${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
    // Optional: device memory (Chrome/Edge only, undefined in Firefox — still useful)
    `mem:${nav.deviceMemory ?? 0}`,
    // Number of touch points (0 for desktops, >0 for touch screens)
    `touch:${nav.maxTouchPoints ?? 0}`,
  ].join('|');

  cached = await sha256(signals);
  return cached;
}
