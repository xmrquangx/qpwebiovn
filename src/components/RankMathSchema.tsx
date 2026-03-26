/* ──────────────────────────────────────────────
 *  RankMathSchema — Server Component
 *  Renders JSON-LD <script> tags from Rank Math data
 * ────────────────────────────────────────────── */

import React from 'react';
import { getRankMathJsonLd } from '@/lib/wordpress/seo';

interface Props {
  /** WordPress URL path, e.g. "/" or "/dich-vu/" */
  wpPath: string;
  /** Optional fallback JSON-LD objects if Rank Math is unavailable */
  fallback?: object[];
}

export default async function RankMathSchema({ wpPath, fallback }: Props) {
  const schemas = await getRankMathJsonLd(wpPath);
  const items = schemas.length > 0 ? schemas : (fallback ?? []);

  if (items.length === 0) return null;

  return (
    <>
      {items.map((schema, i) => (
        <script
          key={`rm-schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
