import React from 'react';
import { getPortfolioBySlug, getPortfolioItems } from '@/lib/wordpress/services';
import PortfolioDetailClient from './PortfolioDetailClient';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const [project, allItems] = await Promise.all([
    getPortfolioBySlug(slug),
    getPortfolioItems(),
  ]);

  // Related projects = all items except current, take first 3
  const relatedItems = allItems.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <PortfolioDetailClient
      project={project}
      slug={slug}
      relatedItems={relatedItems}
    />
  );
}