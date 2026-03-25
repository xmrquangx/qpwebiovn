/* ──────────────────────────────────────────────
 *  WordPress REST API client
 *  Base fetch helpers for the headless backend
 * ────────────────────────────────────────────── */

const WP_API_URL =
  process.env.NEXT_PUBLIC_WP_API_URL || 'https://api.qpweb.io.vn';

const API_BASE = `${WP_API_URL}/wp-json/wp/v2`;

interface FetchOptions {
  tags?: string[];
}

/**
 * Generic fetcher — no caching, always fresh data from WP.
 * Returns `null` when the endpoint returns non-ok or times out.
 */
export async function wpFetch<T>(
  endpoint: string,
  params: Record<string, string | number> = {},
  opts: FetchOptions = {},
): Promise<T | null> {
  const url = new URL(`${API_BASE}/${endpoint}`);
  // Always request embedded data (featured media, terms) & 100 items max
  url.searchParams.set('per_page', '100');
  url.searchParams.set('_embed', '1');
  Object.entries(params).forEach(([k, v]) =>
    url.searchParams.set(k, String(v)),
  );

  const finalUrl = url.toString();
  console.log(`[wpFetch] Fetching: ${finalUrl}`);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout

    const res = await fetch(finalUrl, {
      cache: 'no-store',
      signal: controller.signal,
      next: { tags: opts.tags },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.error(`[wpFetch] HTTP ${res.status}: ${finalUrl}`);
      return null;
    }
    const data = (await res.json()) as T;
    console.log(`[wpFetch] Success: ${endpoint} → ${Array.isArray(data) ? data.length + ' items' : 'object'}`);
    return data;
  } catch (err) {
    console.error(`[wpFetch] Failed: ${finalUrl}`, err instanceof Error ? err.message : err);
    return null;
  }
}

export { API_BASE, WP_API_URL };
