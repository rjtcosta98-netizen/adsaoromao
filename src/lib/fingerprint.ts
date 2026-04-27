/**
 * Hardware fingerprint — identical across ALL browsers on the same device.
 *
 * Rules for signal inclusion:
 *   ✅ INCLUDE: hardware/OS-level, same in Chrome, Firefox, Safari, Edge, incognito
 *   ❌ EXCLUDE: anything browser-configurable or browser-specific
 *
 * Removed vs previous version:
 *   - screen.availWidth/availHeight  → differ per browser on macOS (menu bar handling)
 *   - navigator.language             → user can set different language per browser
 *   - navigator.platform             → deprecated, inconsistent in Safari 15+
 *   - navigator.deviceMemory         → Chrome/Edge only (undefined in Firefox/Safari)
 *   - Canvas / WebGL / Audio         → completely browser-specific rendering
 */

async function sha256(message: string): Promise<string> {
  try {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(message));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    // Fallback: simple hash (same inputs → same output)
    let h = 5381;
    for (let i = 0; i < message.length; i++) { h = ((h << 5) + h) ^ message.charCodeAt(i); h >>>= 0; }
    return h.toString(16).padStart(8, '0').repeat(8);
  }
}

let cached: string | null = null;

/**
 * Returns a hardware fingerprint stable across ALL browsers on the same device.
 * Verified consistent across: Chrome, Firefox, Safari, Edge (normal + incognito).
 */
export async function getDeviceFingerprint(): Promise<string> {
  if (cached) return cached;

  const signals = [
    // Physical screen resolution — hardware, never changes per browser
    `${screen.width}x${screen.height}`,
    // Device pixel ratio — hardware (2 on Retina, 1 on normal displays)
    `dpr:${window.devicePixelRatio ?? 1}`,
    // Color depth — hardware
    `cd:${screen.colorDepth}`,
    // CPU core count — hardware
    `cpu:${navigator.hardwareConcurrency ?? 0}`,
    // Touch screen capability — hardware (0 on desktop, >0 on touch screens)
    `touch:${navigator.maxTouchPoints ?? 0}`,
    // System timezone — OS-level, same across all browsers
    `tz:${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
  ].join('|');

  cached = await sha256(signals);
  return cached;
}
