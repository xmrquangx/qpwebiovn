import React from 'react';
import type { Metadata } from 'next';
import { getPortfolioItems, getPortfolioCategories } from '@/lib/wordpress/services';
import { getPageSEO } from '@/lib/wordpress/seo';
import PortfolioClient from './PortfolioClient';
import RankMathSchema from '@/components/RankMathSchema';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO('portfolio');
}

export default async function PortfolioPage() {
  const [items, categories] = await Promise.all([
    getPortfolioItems(),
    getPortfolioCategories(),
  ]);
  return (
    <>
      <RankMathSchema wpPath="/portfolio/" />
      <PortfolioClient items={items} categories={categories} />
    </>
  );
}
