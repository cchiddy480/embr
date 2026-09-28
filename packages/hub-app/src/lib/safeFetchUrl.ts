import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';

/**
 * SSRF-safe fetch for the AI import pipeline's URL ingestion path. A
 * prospect can hand us any URL, so this has to assume it's hostile:
 * resolve DNS ourselves and check the *resolved IP* (never the hostname —
 * DNS rebinding defeats a hostname-only check), reject anything private,
 * loopback, link-local, or the cloud metadata address, and re-validate at
 * every redirect hop rather than trusting the first check to cover the
 * whole chain.
 */

const MAX_REDIRECTS = 2;
const TIMEOUT_MS = 8_000;
const MAX_BYTES = 2 * 1024 * 1024; // 2 MB, enforced while streaming — never trust Content-Length alone

export class UnsafeUrlError extends Error {}

function isPrivateOrReservedIp(ip: string): boolean {
  const version = isIP(ip);
  if (version === 4) {
    const parts = ip.split('.').map(Number);
    const [a, b] = parts;
    if (a === 10) return true; // 10.0.0.0/8
    if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12
    if (a === 192 && b === 168) return true; // 192.168.0.0/16
    if (a === 127) return true; // 127.0.0.0/8 loopback
    if (a === 169 && b === 254) return true; // 169.254.0.0/16 — includes the 169.254.169.254 cloud metadata address
    if (a === 0) return true; // 0.0.0.0/8
    if (a >= 224) return true; // multicast/reserved
    return false;
  }
  if (version === 6) {
    const lower = ip.toLowerCase();
    if (lower === '::1') return true; // loopback
    if (lower.startsWith('fe80:') || lower.startsWith('fe8') || lower.startsWith('fe9') || lower.startsWith('fea') || lower.startsWith('feb')) return true; // link-local fe80::/10
    if (lower.startsWith('fc') || lower.startsWith('fd')) return true; // unique local fc00::/7
    if (lower.startsWith('::ffff:')) {
      // IPv4-mapped IPv6 — check the embedded IPv4 address too
      return isPrivateOrReservedIp(lower.replace('::ffff:', ''));
    }
    return false;
  }
  return true; // couldn't parse as an IP at all — refuse rather than guess
}

async function assertSafeHost(hostname: string): Promise<void> {
  let addresses: { address: string }[];
  try {
    addresses = await lookup(hostname, { all: true });
  } catch (e) {
    throw new UnsafeUrlError(`Could not resolve host: ${hostname}`);
  }
  for (const { address } of addresses) {
    if (isPrivateOrReservedIp(address)) {
      throw new UnsafeUrlError(`Refusing to fetch ${hostname}: resolves to a private/reserved address (${address})`);
    }
  }
}

export interface SafeFetchResult {
  text: string;
  finalUrl: string;
  contentType: string | null;
}

/**
 * Known limitation: this resolves and checks DNS, then makes a separate
 * `fetch()` call that resolves DNS again internally — a classic TOCTOU/DNS
 * -rebinding gap (the second resolution could theoretically return a
 * different, unsafe IP if an attacker controls the DNS record and flips it
 * between the two lookups). Closing that gap fully means pinning the
 * actual socket connection to the IP this function already validated,
 * which needs a custom low-level HTTP agent (e.g. undici's `Agent` with a
 * `lookup` override) — real extra complexity. Acceptable for now since
 * this only runs from prospect-demo.js, an internal CLI tool the founder
 * runs by hand, not a public endpoint. This must be closed before this
 * code path is ever reachable from a public route (Phase D's `/try`).
 */
export async function safeFetchUrl(inputUrl: string): Promise<SafeFetchResult> {
  let currentUrl: URL;
  try {
    currentUrl = new URL(inputUrl);
  } catch {
    throw new UnsafeUrlError('Not a valid URL');
  }

  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    if (currentUrl.protocol !== 'http:' && currentUrl.protocol !== 'https:') {
      throw new UnsafeUrlError(`Unsupported scheme: ${currentUrl.protocol}`);
    }
    await assertSafeHost(currentUrl.hostname);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
    let response: Response;
    try {
      response = await fetch(currentUrl.toString(), {
        redirect: 'manual',
        signal: controller.signal,
        headers: { 'user-agent': 'Embr-Import/1.0 (+https://build-embr.co.uk)' },
      });
    } finally {
      clearTimeout(timeout);
    }

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (!location) throw new UnsafeUrlError('Redirect with no Location header');
      if (hop === MAX_REDIRECTS) throw new UnsafeUrlError('Too many redirects');
      currentUrl = new URL(location, currentUrl);
      continue;
    }

    if (!response.ok) {
      throw new UnsafeUrlError(`Fetch failed with status ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    const body = response.body;
    if (!body) return { text: await response.text(), finalUrl: currentUrl.toString(), contentType };

    const reader = body.getReader();
    const chunks: Uint8Array[] = [];
    let total = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BYTES) {
        await reader.cancel();
        throw new UnsafeUrlError(`Response exceeded ${MAX_BYTES} byte cap`);
      }
      chunks.push(value);
    }
    const text = Buffer.concat(chunks.map((c) => Buffer.from(c))).toString('utf-8');
    return { text, finalUrl: currentUrl.toString(), contentType };
  }

  throw new UnsafeUrlError('Too many redirects');
}
