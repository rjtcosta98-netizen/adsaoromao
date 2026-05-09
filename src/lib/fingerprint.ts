/**
 * Hardware fingerprint v2 — identical across ALL browsers on the same device.
 *
 * Rules for signal inclusion:
 *   ✅ INCLUDE: hardware/OS-level, same in Chrome, Firefox, Safari, Edge, incognito
 *   ❌ EXCLUDE: anything browser-configurable or browser-specific
 *
 * v2 additions vs v1:
 *   + screen.pixelDepth          → hardware color bit depth (OS-level)
 *   + WebGL UNMASKED_RENDERER    → GPU model string (hardware), cross-browser stable
 *   + system font sample         → OS font set via canvas width measurement, not rendering
 *
 * Still excluded (browser-specific):
 *   - Canvas / WebGL rendering output  → pixels differ per browser
 *   - navigator.language               → user-configurable per browser
 *   - navigator.platform               → deprecated, inconsistent Safari 15+
 *   - screen.availWidth/availHeight    → differ per browser on macOS
 */

async function sha256(message: string): Promise<string> {
  try {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(message));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    let h = 5381;
    for (let i = 0; i < message.length; i++) { h = ((h << 5) + h) ^ message.charCodeAt(i); h >>>= 0; }
    return h.toString(16).padStart(8, '0').repeat(8);
  }
}

/**
 * Detect which of 8 reference fonts are installed via canvas text width measurement.
 * This measures the OS font set — same across all browsers on the same machine.
 * Returns a compact bitmask string like "10110101".
 */
function getSystemFontSample(): string {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'na';

    const FONTS = ['Arial', 'Georgia', 'Courier New', 'Times New Roman', 'Verdana', 'Trebuchet MS', 'Impact', 'Comic Sans MS'];
    const BASELINE = 'monospace';
    const TEST_STRING = 'mmmmmmmmmmlli';
    const SIZE = '16px';

    ctx.font = `${SIZE} ${BASELINE}`;
    const baseWidth = ctx.measureText(TEST_STRING).width;

    return FONTS.map(font => {
      ctx.font = `${SIZE} '${font}', ${BASELINE}`;
      return ctx.measureText(TEST_STRING).width !== baseWidth ? '1' : '0';
    }).join('');
  } catch {
    return 'na';
  }
}

/**
 * Get GPU model via WebGL UNMASKED_RENDERER_WEBGL extension.
 * This returns the actual GPU model string (e.g. "Intel Iris Plus Graphics").
 * Hardware-level — identical across Chrome, Firefox, Safari, Edge on the same device.
 * Strips driver version suffix to keep only the GPU model name.
 */
function getGpuRenderer(): string {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (!gl) return 'na';
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (!ext) return 'na';
    const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) as string ?? '';
    // Strip trailing driver version like " (0x00001234)" or " Direct3D11"
    return renderer.replace(/\s*[\(\[].+?[\)\]]\s*$/g, '').trim() || 'na';
  } catch {
    return 'na';
  }
}

let cached: string | null = null;

/**
 * Returns a per-browser identifier stable across page loads on the same browser.
 * Combines a persistent random UUID (localStorage) with hardware signals so that:
 *   - Two identical phones → different fingerprints (UUID differs)
 *   - Same browser across reloads → same fingerprint (UUID persists)
 *   - Incognito → different fingerprint from normal mode (separate localStorage)
 *
 * Note: clearing localStorage resets the identifier and allows re-voting.
 * This is intentional — hardware-only fingerprints cause false collisions on
 * identical devices (same phone model, same country).
 */
function getBrowserUUID(): string {
  const KEY = 'adsr_browser_uid';
  try {
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = crypto.randomUUID ? crypto.randomUUID() : Array.from(crypto.getRandomValues(new Uint8Array(16))).map(b => b.toString(16).padStart(2, '0')).join('');
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return 'no-storage';
  }
}
export async function getDeviceFingerprint(): Promise<string> {
  if (cached) return cached;

  const signals = [
    // Persistent random UUID — unique per browser instance, survives reloads
    `uid:${getBrowserUUID()}`,
    // Physical screen resolution — hardware, never changes per browser
    `${screen.width}x${screen.height}`,
    // Device pixel ratio — rounded to nearest integer to ignore browser zoom
    `dpr:${Math.round(window.devicePixelRatio ?? 1)}`,
    // Color depth (bits per channel) — hardware
    `cd:${screen.colorDepth}`,
    // Pixel depth (total bits per pixel) — hardware, v2 addition
    `px:${screen.pixelDepth}`,
    // CPU core count — hardware
    `cpu:${navigator.hardwareConcurrency ?? 0}`,
    // Touch screen capability — hardware (0 on desktop, >0 on touch screens)
    `touch:${navigator.maxTouchPoints ?? 0}`,
    // System timezone — OS-level, same across all browsers
    `tz:${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
    // GPU model — hardware, v2 addition
    `gpu:${getGpuRenderer()}`,
    // System font presence — OS-level font set, v2 addition
    `fonts:${getSystemFontSample()}`,
  ].join('|');

  cached = await sha256(signals);
  return cached;
}
