import React from 'react';
import type { Metadata } from 'next';
import { getPortfolioBySlug, getPortfolioItems } from '@/lib/wordpress/services';
import { getPostSEO } from '@/lib/wordpress/seo';
import PortfolioDetailClient from './PortfolioDetailClient';
import RankMathSchema from '@/components/RankMathSchema';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPortfolioBySlug(slug);
  return getPostSEO(
    'portfolio',
    slug,
    project ? `${project.title} | WebAgencyVN` : undefined,
    project ? `Dự án ${project.title} cho ${project.client}. ${project.result}` : undefined,
  );
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
    <>
      <RankMathSchema wpPath={`/portfolio/${slug}/`} />
      <PortfolioDetailClient
        project={project}
        slug={slug}
        relatedItems={relatedItems}
      />
    </>
  );
}