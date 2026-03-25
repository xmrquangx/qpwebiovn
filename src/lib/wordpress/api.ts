/* ──────────────────────────────────────────────
 *  WordPress REST API client
 *  Base fetch helpers for the headless backend
 * ────────────────────────────────────────────── */

const WP_API_URL =
  process.env.NEXT_PUBLIC_WP_API_URL || 'https://api.qpweb.io.vn';

const API_BASE = `${WP_API_URL}/wp-json/wp/v2`;

interface FetchOptions {
  revalidate?: number;
  tags?: string[];
}

/**
 * Generic fetcher that wraps Next.js `fetch` with ISR caching.
 * Returns `null` when the endpoint returns 404 or throws non-ok.
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

  try {
    const res = await fetch(url.toString(), {
      next: {
        revalidate: opts.revalidate ?? 60, // ISR 60s default
        tags: opts.tags,
      },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    console.error(`[wpFetch] Failed: ${url.toString()}`);
    return null;
  }
}

export { API_BASE, WP_API_URL };
