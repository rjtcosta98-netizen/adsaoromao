/**
 * Hardware-based device fingerprinting.
 * Produces a stable SHA-256 hash using signals that survive:
 *   - incognito / private browsing
 *   - localStorage / cookie clearing
 *   - IP changes
 *
 * The same physical device + browser combination always yields the
 * same fingerprint, so duplicate votes are blocked server-side even
 * when the user tries a fresh session or anonymous window.
 */

/** djb2-style unsigned 32-bit hash of a string → hex */
function hashStr(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h) ^ s.charCodeAt(i);
    h >>>= 0; // keep unsigned
  }
  return h.toString(16).padStart(8, '0');
}

/** Canvas 2D pixel fingerprint */
function canvasFingerprint(): string {
  try {
    const c = document.createElement('canvas');
    c.width = 280;
    c.height = 60;
    const ctx = c.getContext('2d');
    if (!ctx) return 'no-canvas';

    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.font = '11pt "Times New Roman"';
    ctx.fillText('ADSR Cwm fjordbank glyphs vext quiz 😀', 2, 15);
    ctx.fillStyle = 'rgba(102,204,0,0.7)';
    ctx.font = '18pt Arial';
    ctx.fillText('ADSR Cwm fjordbank', 4, 45);

    return hashStr(c.toDataURL());
  } catch {
    return 'canvas-err';
  }
}

/** WebGL GPU vendor + renderer */
function webglFingerprint(): string {
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl') || c.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (!gl) return 'no-webgl';
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (!ext) return 'no-ext';
    const vendor = gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) as string;
    const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) as string;
    return hashStr(`${vendor}|${renderer}`);
  } catch {
    return 'webgl-err';
  }
}

/** Screen + device properties */
function screenFingerprint(): string {
  const s = screen;
  return [
    s.width,
    s.height,
    s.colorDepth,
    s.pixelDepth,
    window.devicePixelRatio ?? 1,
    s.availWidth,
    s.availHeight,
  ].join('x');
}

/** Navigator / hardware signals */
function navigatorFingerprint(): string {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { effectiveType?: string } };
  return [
    nav.userAgent,
    nav.language,
    (nav.languages ?? []).join(','),
    nav.platform,
    nav.hardwareConcurrency ?? 0,
    nav.deviceMemory ?? 0,
    nav.cookieEnabled,
    nav.doNotTrack ?? 'null',
  ].join('|');
}

/** Timezone + locale */
function timeFingerprint(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return String(-new Date().getTimezoneOffset());
  }
}

/** Audio context fingerprint (oscillator hash) */
async function audioFingerprint(): Promise<string> {
  try {
    const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return 'no-audio';

    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const analyser = ctx.createAnalyser();
    const gain = ctx.createGain();
    const scriptProc = ctx.createScriptProcessor(4096, 1, 1);

    gain.gain.value = 0; // silent — we only need the signal, not sound
    osc.type = 'triangle';
    osc.connect(analyser);
    analyser.connect(scriptProc);
    scriptProc.connect(gain);
    gain.connect(ctx.destination);

    return new Promise<string>(resolve => {
      scriptProc.onaudioprocess = (e) => {
        const data = e.inputBuffer.getChannelData(0);
        let sum = 0;
        for (let i = 0; i < data.length; i++) sum += Math.abs(data[i]);
        resolve(hashStr(String(sum)));
        osc.disconnect();
        analyser.disconnect();
        scriptProc.disconnect();
        gain.disconnect();
        ctx.close();
      };
      osc.start(0);
      setTimeout(() => resolve('audio-timeout'), 1000);
    });
  } catch {
    return 'audio-err';
  }
}

/** SHA-256 via SubtleCrypto → hex string */
async function sha256(message: string): Promise<string> {
  try {
    const data = new TextEncoder().encode(message);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  } catch {
    // Fallback for environments without SubtleCrypto
    return hashStr(message).repeat(8).slice(0, 64);
  }
}

// Cache so we don't recompute within the same tab session
let cachedFingerprint: string | null = null;

/**
 * Returns a stable device fingerprint.
 * Consistent across incognito, IP changes, and cleared storage.
 * Call once and cache the result.
 */
export async function getDeviceFingerprint(): Promise<string> {
  if (cachedFingerprint) return cachedFingerprint;

  const [audio] = await Promise.all([audioFingerprint()]);

  const raw = [
    canvasFingerprint(),
    webglFingerprint(),
    screenFingerprint(),
    hashStr(navigatorFingerprint()),
    timeFingerprint(),
    audio,
  ].join('::');

  cachedFingerprint = await sha256(raw);
  return cachedFingerprint;
}
