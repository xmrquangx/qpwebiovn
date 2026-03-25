---
name: Headless WordPress + Next.js
description: Quy trình chuẩn để migrate Next.js project sang dynamic headless WordPress architecture, deploy trên Vercel.
---

# Headless WordPress + Next.js Migration

## Tổng quan

Skill này hướng dẫn chuyển đổi Next.js project từ dữ liệu tĩnh (hardcoded) sang dynamic headless WordPress. Frontend deploy trên Vercel, backend WordPress cung cấp REST API.

## Kiến trúc

```
User → Vercel (Next.js SSR) → WordPress REST API → WP Database
                             ↘ Fallback Static Data (nếu API fail)
```

---

## Phase 1: WordPress Backend

### 1.1 Tạo Plugin Custom Post Types

Tạo file `docs/wordpress-import/qpweb-headless-setup.php` với:

```php
<?php
/**
 * Plugin Name: Headless Setup
 */

// Register CPT
function register_custom_cpts() {
    register_post_type('service', [
        'public' => true,
        'show_in_rest' => true, // BẮT BUỘC cho REST API
        'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
        'labels' => ['name' => 'Dịch vụ'],
    ]);
    // Thêm CPTs khác tương tự...
}
add_action('init', 'register_custom_cpts');

// Register SCF fields
function register_scf_fields() {
    register_post_meta('service', 'service_num', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true, // BẮT BUỘC
    ]);
    // Thêm fields khác...
}
add_action('init', 'register_scf_fields');

// CORS cho frontend domain
function add_cors_headers() {
    header('Access-Control-Allow-Origin: https://your-frontend.com');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}
add_action('rest_api_init', 'add_cors_headers');
```

### 1.2 Import dữ liệu mẫu

**Phương pháp**: Tạo WXR XML → Import thủ công qua WP Admin → Tools → Import

```javascript
// generate-wxr.mjs — Tạo WXR XML từ static data
// Upload ảnh riêng qua Media Library
// Dùng PHP snippet để auto-assign featured images
```

---

## Phase 2: Frontend Data Layer

### 2.1 API Client — `src/lib/wordpress/api.ts`

```typescript
const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://api.example.com';
const API_BASE = `${WP_API_URL}/wp-json/wp/v2`;

export async function wpFetch<T>(
  endpoint: string,
  params: Record<string, string | number> = {},
): Promise<T | null> {
  const url = new URL(`${API_BASE}/${endpoint}`);
  url.searchParams.set('per_page', '100');
  url.searchParams.set('_embed', '1'); // ← Featured media + taxonomy terms
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url.toString(), {
      cache: 'no-store',  // ← KHÔNG dùng ISR cache
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}
```

> **CRITICAL**: Phải dùng `cache: 'no-store'`, KHÔNG dùng `next: { revalidate }` — ISR cache sẽ cache cả kết quả lỗi!

### 2.2 Types — `src/lib/wordpress/types.ts`

```typescript
export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  menu_order: number;
  meta: Record<string, unknown>;   // ← Simple field values
  acf: Record<string, unknown>;    // ← Values + source metadata + repeaters
  _embedded?: Record<string, unknown>; // ← Featured media, taxonomy terms
}
```

### 2.3 Services — `src/lib/wordpress/services.ts`

**Template cho mỗi CPT**:

```typescript
export async function getItems(): Promise<Item[]> {
  const posts = await wpFetch<WPPost[]>('cpt-slug', {
    orderby: 'date',  // ← KHÔNG dùng 'menu_order' (HTTP 400!)
    order: 'asc',
  });
  if (!posts || !Array.isArray(posts)) return [];

  return posts.map((p) => {
    const acf = p.acf || {};
    const meta = p.meta || {};
    return {
      title: stripHtml(p.title.rendered),
      // Đọc field từ cả acf và meta (fallback)
      field: String(acf.field_name || meta.field_name || ''),
      // Repeater fields CHỈ có trong acf
      items: repeaterToStrings(acf.repeater_field, 'sub_field_name'),
      // Featured image từ _embedded
      image: getFeaturedImageUrl(p),
      // Taxonomy terms từ _embedded
      tag: getEmbeddedTerms(p, 0)[0] || '',
    };
  });
}
```

**Helper functions cần thiết**:

```typescript
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
    .replace(/&#0?38;/g, '&')
    .replace(/&#0?34;/g, '"')
    .trim();
}

function getFeaturedImageUrl(post: WPPost): string {
  return (post as any)._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
}

function getEmbeddedTerms(post: WPPost, index = 0): string[] {
  const terms = (post as any)._embedded?.['wp:term']?.[index];
  return Array.isArray(terms) ? terms.map((t: any) => t.name) : [];
}

function repeaterToStrings(field: unknown, subField: string): string[] {
  if (!Array.isArray(field)) return [];
  return field.map((row: any) => String(row[subField] ?? ''));
}
```

---

## Phase 3: Page Refactoring

### Pattern: Server Component + Client Component

**Server Component** — `page.tsx`:
```typescript
import { getData } from '@/lib/wordpress/services';
import PageClient from './PageClient';

export const dynamic = 'force-dynamic'; // ← BẮT BUỘC cho Vercel!

export default async function Page() {
  const data = await getData();
  return <PageClient data={data} />;
}
```

**Client Component** — `PageClient.tsx`:
```typescript
'use client';

const fallbackData = [...]; // Dữ liệu tĩnh backup

export default function PageClient({ data: wpData }) {
  const items = wpData.length > 0 ? wpData : fallbackData;
  // render using items...
}
```

### Homepage Pattern (nhiều sections)

```typescript
// home/page.tsx
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [a, b, c] = await Promise.all([getA(), getB(), getC()]);
  return (
    <>
      <SectionA wpData={a} />
      <SectionB wpData={b} />
      <SectionC wpData={c} />
    </>
  );
}

// Mỗi section component:
export default function SectionA({ wpData = [] }) {
  const items = wpData.length > 0 ? wpData : fallbackData;
  // ...
}
```

### Root URL (`/` thay vì `/home`)

```typescript
// src/app/page.tsx
export { default } from './home/page';
export { dynamic } from './home/page';
```

---

## Phase 4: Deployment (Vercel)

### Environment Variables

| Key | Value | Note |
|-----|-------|------|
| `NEXT_PUBLIC_WP_API_URL` | `https://api.example.com` | WordPress REST API base |
| `NEXT_PUBLIC_SITE_URL` | `https://example.com` | Frontend URL |

### Image Hosts

Thêm WP domain vào `image-hosts.config.mjs` hoặc `next.config.js`:

```javascript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'api.example.com' },
  ],
}
```

### Workflow Deploy

```bash
git add -A
git commit -m "feat: connect WordPress data"
git push origin main
# Vercel auto-deploy từ main branch
```

---

## ⚠️ 8 Gotchas Quan Trọng

| # | Vấn đề | Giải pháp |
|---|--------|-----------|
| 1 | `orderby=menu_order` → **HTTP 400** | Dùng `orderby=date` hoặc `orderby=title` |
| 2 | Vercel build không kết nối được WP API | Dùng `export const dynamic = 'force-dynamic'` |
| 3 | ISR cache kết quả lỗi (null) | Dùng `cache: 'no-store'` |
| 4 | WP data giống fallback → tưởng static | Thêm `console.log` + sửa 1 title trong WP để test |
| 5 | SCF field values ở đâu? | `meta` = simple values, `acf` = values + repeaters |
| 6 | Featured image URL không có | `_embed=1` + `_embedded['wp:featuredmedia']` |
| 7 | Taxonomy term names | `_embed=1` + `_embedded['wp:term']` |
| 8 | WordPress encode `&` → `&#038;` | `stripHtml()` phải decode HTML entities |

---

## Debug Checklist

Khi data không hiện trên Vercel:

1. ☐ Kiểm tra Vercel **Runtime Logs** (Deployments → Functions tab)
2. ☐ Tìm log `[wpFetch]` → xem có HTTP error code không
3. ☐ Nếu **HTTP 400**: kiểm tra query params (orderby, taxonomy filter)
4. ☐ Nếu **HTTP 404**: kiểm tra CPT slug đúng chưa
5. ☐ Nếu **timeout/failed**: WP server chặn Vercel IP → thử `force-dynamic`
6. ☐ Nếu **0 items**: kiểm tra `dynamic = 'force-dynamic'` có trong page.tsx không
7. ☐ Sửa 1 title trong WP → refresh frontend → nếu không đổi = đang dùng fallback
