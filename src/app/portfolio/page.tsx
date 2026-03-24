import React from 'react';
import { getPortfolioItems, getPortfolioCategories } from '@/lib/wordpress/services';
import PortfolioClient from './PortfolioClient';

export default async function PortfolioPage() {
  const [items, categories] = await Promise.all([
    getPortfolioItems(),
    getPortfolioCategories(),
  ]);
  return <PortfolioClient items={items} categories={categories} />;
}
