import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://webagencyvn.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/home`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}