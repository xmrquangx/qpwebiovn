/* ──────────────────────────────────────────────
 *  Rank Math SEO — Fetch & parse SEO data from WordPress
 *  Uses Rank Math's built-in REST API endpoint: /rankmath/v1/getHead
 * ────────────────────────────────────────────── */

import type { Metadata } from 'next';

const WP_API_URL =
  process.env.NEXT_PUBLIC_WP_API_URL || 'https://api.qpweb.io.vn';
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://qpweb.io.vn';

/* ── Types ── */

export interface RankMathSEO {
  title: string;
  description: string;
  canonical: string;
  robots: Record<string, string>;
  openGraph: {
    title: string;
    description: string;
    url: string;
    type: string;
    locale: string;
    siteName: string;
    images: { url: string; width?: number; height?: number; alt?: string }[];
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    images: string[];
  };
  jsonLd: object[];
}

interface RankMathHeadResponse {
  success: boolean;
  head: string;
}

/* ── HTML head parsing helpers ── */

/** Extract content from <meta property="X" content="Y"> or <meta name="X" content="Y"> */
function extractMeta(head: string, prop: string): string {
  // property/name before content
  const r1 = new RegExp(
    `<meta\\s+(?:property|name)=["']${escapeRegex(prop)}["']\\s+content=["']([^"']*)["']`,
    'i',
  );
  const m1 = head.match(r1);
  if (m1) return decodeHtmlEntities(m1[1]);

  // content before property/name
  const r2 = new RegExp(
    `<meta\\s+content=["']([^"']*)["']\\s+(?:property|name)=["']${escapeRegex(prop)}["']`,
    'i',
  );
  const m2 = head.match(r2);
  return m2 ? decodeHtmlEntities(m2[1]) : '';
}

function extractTitle(head: string): string {
  const m = head.match(/<title>([^<]*)<\/title>/i);
  return m ? decodeHtmlEntities(m[1]) : '';
}

function extractCanonical(head: string): string {
  const m = head.match(
    /<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i,
  );
  return m ? m[1] : '';
}

function extractJsonLd(head: string): object[] {
  const schemas: object[] = [];
  const regex =
    /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(head)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      schemas.push(parsed);
    } catch {
      /* skip invalid JSON */
    }
  }
  return schemas;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&#0?38;/g, '&')
    .replace(/&#0?34;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');
}

/** Replace WordPress API domain with frontend domain in URLs */
function rewriteUrl(url: string): string {
  if (!url) return url;
  return url.replace(WP_API_URL, SITE_URL);
}

/* ── Core fetcher ── */

/**
 * Fetch Rank Math's generated <head> HTML for a given WordPress URL path.
 * @param wpPath — e.g. "/dich-vu/" or "/portfolio/my-project/"
 */
export async function fetchRankMathHead(
  wpPath: string,
): Promise<string | null> {
  const pageUrl = `${WP_API_URL}/${wpPath.replace(/^\//, '')}`;
  const endpoint = `${WP_API_URL}/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(pageUrl)}`;

  console.log(`[RankMath] Fetching SEO: ${endpoint}`);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(endpoint, {
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      // 404 is expected when page doesn't have SEO data yet — don't log as error
      console.log(`[RankMath] HTTP ${res.status} for "${wpPath}" — using fallback`);
      return null;
    }
    const data = (await res.json()) as RankMathHeadResponse;
    if (!data.success || !data.head) {
      console.log('[RankMath] No head data returned — using fallback');
      return null;
    }
    console.log(`[RankMath] Success: received ${data.head.length} chars`);
    return data.head;
  } catch (err) {
    console.log(
      '[RankMath] Fetch failed, using fallback:',
      err instanceof Error ? err.message : err,
    );
    return null;
  }
}

/* ── Parser ── */

/** Parse raw Rank Math <head> HTML into structured SEO object */
export function parseRankMathHead(head: string): RankMathSEO {
  const title = extractTitle(head);
  const description = extractMeta(head, 'description');
  const canonical = extractCanonical(head);

  // Robots
  const robotsRaw = extractMeta(head, 'robots');
  const robots: Record<string, string> = {};
  if (robotsRaw) {
    robotsRaw.split(',').forEach((part) => {
      const trimmed = part.trim();
      if (trimmed.includes(':')) {
        const [k, v] = trimmed.split(':');
        robots[k.trim()] = v.trim();
      } else if (trimmed) {
        robots[trimmed] = trimmed;
      }
    });
  }

  // Open Graph
  const ogImage = extractMeta(head, 'og:image');
  const ogImageWidth = extractMeta(head, 'og:image:width');
  const ogImageHeight = extractMeta(head, 'og:image:height');
  const ogImageAlt = extractMeta(head, 'og:image:alt');

  // Twitter
  const twitterImage = extractMeta(head, 'twitter:image');

  // Schema / JSON-LD
  const jsonLd = extractJsonLd(head);

  return {
    title,
    description,
    canonical: rewriteUrl(canonical),
    robots,
    openGraph: {
      title: extractMeta(head, 'og:title') || title,
      description: extractMeta(head, 'og:description') || description,
      url: rewriteUrl(extractMeta(head, 'og:url') || canonical),
      type: extractMeta(head, 'og:type') || 'website',
      locale: extractMeta(head, 'og:locale') || 'vi_VN',
      siteName: extractMeta(head, 'og:site_name') || 'WebAgencyVN',
      images: ogImage
        ? [
            {
              url: ogImage,
              ...(ogImageWidth && { width: parseInt(ogImageWidth) }),
              ...(ogImageHeight && { height: parseInt(ogImageHeight) }),
              ...(ogImageAlt && { alt: ogImageAlt }),
            },
          ]
        : [],
    },
    twitter: {
      card: extractMeta(head, 'twitter:card') || 'summary_large_image',
      title: extractMeta(head, 'twitter:title') || title,
      description:
        extractMeta(head, 'twitter:description') || description,
      images: twitterImage ? [twitterImage] : [],
    },
    jsonLd,
  };
}

/* ── Converters ── */

/**
 * Convert RankMathSEO → Next.js Metadata object.
 * URLs are rewritten from WP domain to frontend domain.
 */
export function toNextMetadata(
  seo: RankMathSEO,
  fallback?: Partial<Metadata>,
): Metadata {
  return {
    title: seo.title || fallback?.title,
    description: seo.description || fallback?.description,
    ...(seo.canonical && {
      alternates: { canonical: seo.canonical },
    }),
    openGraph: {
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      url: seo.openGraph.url,
      type: seo.openGraph.type as 'website' | 'article',
      locale: seo.openGraph.locale,
      siteName: seo.openGraph.siteName,
      ...(seo.openGraph.images.length > 0 && {
        images: seo.openGraph.images,
      }),
    },
    twitter: {
      card: seo.twitter.card as 'summary_large_image' | 'summary',
      title: seo.twitter.title,
      description: seo.twitter.description,
      ...(seo.twitter.images.length > 0 && {
        images: seo.twitter.images,
      }),
    },
  };
}

/* ── High-level API for pages ── */

/**
 * Fallback metadata defaults for each page.
 * Used when Rank Math data is unavailable.
 */
const PAGE_DEFAULTS: Record<string, { title: string; description: string }> = {
  home: {
    title: 'WebAgencyVN — Website Đẹp Lên Sóng Trong 5 Ngày',
    description:
      'Freelancer thiết kế website WordPress Flatsome cho cá nhân và doanh nghiệp nhỏ tại Việt Nam. SEO local, tích hợp Zalo, bàn giao trong 5 ngày.',
  },
  'dich-vu': {
    title: 'Dịch Vụ Thiết Kế Website | WebAgencyVN',
    description:
      'Dịch vụ thiết kế website WordPress Flatsome chuẩn SEO, responsive, tích hợp Zalo. Bàn giao trong 5 ngày.',
  },
  gia: {
    title: 'Bảng Giá Thiết Kế Website | WebAgencyVN',
    description:
      'Bảng giá thiết kế website WordPress Flatsome từ 3.5 triệu. Gói Basic, Standard, Pro phù hợp mọi ngân sách.',
  },
  'lien-he': {
    title: 'Liên Hệ | WebAgencyVN',
    description:
      'Liên hệ WebAgencyVN để được tư vấn thiết kế website miễn phí. Hotline, Zalo, Email.',
  },
  'khach-hang': {
    title: 'Khách Hàng Nói Gì | WebAgencyVN',
    description:
      'Đánh giá từ khách hàng đã sử dụng dịch vụ thiết kế website của WebAgencyVN.',
  },
  'quy-trinh': {
    title: 'Quy Trình Thiết Kế Website | WebAgencyVN',
    description:
      'Quy trình 5 ngày thiết kế website WordPress chuyên nghiệp: tư vấn, thiết kế, phát triển, kiểm thử, bàn giao.',
  },
  portfolio: {
    title: 'Dự Án Đã Thực Hiện | WebAgencyVN',
    description:
      'Xem các dự án website WordPress đã hoàn thành cho khách hàng: Spa, Coaching, F&B, và nhiều ngành khác.',
  },
};

/**
 * Get SEO metadata for a page.
 * Fetches from Rank Math, falls back to hardcoded defaults.
 *
 * @param pageSlug — e.g. "home", "dich-vu", "gia"
 * @param wpPath — WordPress URL path (defaults to `/${pageSlug}/`)
 */
export async function getPageSEO(
  pageSlug: string,
  wpPath?: string,
): Promise<Metadata> {
  const path = wpPath || (pageSlug === 'home' ? '/' : `/${pageSlug}/`);
  const fallback = PAGE_DEFAULTS[pageSlug] || {
    title: 'WebAgencyVN',
    description: '',
  };

  const head = await fetchRankMathHead(path);
  if (!head) {
    console.warn(
      `[RankMath] No data for "${pageSlug}", using fallback`,
    );
    return {
      title: fallback.title,
      description: fallback.description,
      openGraph: {
        title: fallback.title,
        description: fallback.description,
        url: `${SITE_URL}${pageSlug === 'home' ? '' : `/${pageSlug}`}`,
        type: 'website',
        locale: 'vi_VN',
        siteName: 'WebAgencyVN',
        images: [{ url: `${SITE_URL}/assets/images/app_logo.png`, width: 1200, height: 630 }],
      },
    };
  }

  const seo = parseRankMathHead(head);
  return toNextMetadata(seo, fallback);
}

/**
 * Get SEO metadata for a dynamic post (e.g., portfolio detail).
 * @param cptSlug — CPT URI slug, e.g. "portfolio"
 * @param postSlug — post slug
 * @param fallbackTitle — fallback title if Rank Math is unavailable
 */
export async function getPostSEO(
  cptSlug: string,
  postSlug: string,
  fallbackTitle?: string,
  fallbackDesc?: string,
): Promise<Metadata> {
  const wpPath = `/${cptSlug}/${postSlug}/`;
  const head = await fetchRankMathHead(wpPath);

  if (!head) {
    return {
      title: fallbackTitle || 'WebAgencyVN',
      description: fallbackDesc || '',
      openGraph: {
        title: fallbackTitle || 'WebAgencyVN',
        description: fallbackDesc || '',
        url: `${SITE_URL}/${cptSlug}/${postSlug}`,
        type: 'article',
        locale: 'vi_VN',
        siteName: 'WebAgencyVN',
      },
    };
  }

  const seo = parseRankMathHead(head);
  return toNextMetadata(seo);
}

/**
 * Generate JSON-LD <script> tags from Rank Math schema data.
 * Call this in your page component to inject structured data.
 */
export async function getRankMathJsonLd(
  wpPath: string,
): Promise<object[]> {
  const head = await fetchRankMathHead(wpPath);
  if (!head) return [];

  const jsonLd = extractJsonLd(head);
  // Rewrite any WordPress URLs to frontend URLs in the JSON-LD
  const rewritten = JSON.parse(
    JSON.stringify(jsonLd).replaceAll(WP_API_URL, SITE_URL),
  );
  return rewritten;
}
