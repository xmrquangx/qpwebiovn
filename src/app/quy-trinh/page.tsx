import React from 'react';
import type { Metadata } from 'next';
import { getProcessSteps, getFAQs } from '@/lib/wordpress/services';
import { getPageSEO } from '@/lib/wordpress/seo';
import QuyTrinhClient from './QuyTrinhClient';
import RankMathSchema from '@/components/RankMathSchema';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO('quy-trinh');
}

export default async function QuyTrinhPage() {
  const [steps, faqs] = await Promise.all([
    getProcessSteps(),
    getFAQs('quy-trinh'),
  ]);
  return (
    <>
      <RankMathSchema wpPath="/quy-trinh/" />
      <QuyTrinhClient steps={steps} faqs={faqs} />
    </>
  );
}
