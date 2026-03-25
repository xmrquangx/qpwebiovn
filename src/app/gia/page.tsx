import React from 'react';
import { getPricingPlans, getAddons, getFAQs } from '@/lib/wordpress/services';
import GiaClient from './GiaClient';

export const dynamic = 'force-dynamic';
export default async function GiaPage() {
  const [plans, addons, faqs] = await Promise.all([
    getPricingPlans(),
    getAddons(),
    getFAQs('gia'),
  ]);
  return <GiaClient plans={plans} addons={addons} faqs={faqs} />;
}
