import React from 'react';
import type { Metadata } from 'next';
import { getPricingPlans, getAddons, getFAQs } from '@/lib/wordpress/services';
import { getPageSEO } from '@/lib/wordpress/seo';
import GiaClient from './GiaClient';
import RankMathSchema from '@/components/RankMathSchema';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO('gia');
}

export default async function GiaPage() {
  const [plans, addons, faqs] = await Promise.all([
    getPricingPlans(),
    getAddons(),
    getFAQs('gia'),
  ]);
  return (
    <>
      <RankMathSchema wpPath="/gia/" />
      <GiaClient plans={plans} addons={addons} faqs={faqs} />
    </>
  );
}
