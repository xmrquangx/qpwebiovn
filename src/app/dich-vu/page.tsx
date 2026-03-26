import React from 'react';
import type { Metadata } from 'next';
import { getServices } from '@/lib/wordpress/services';
import { getPageSEO } from '@/lib/wordpress/seo';
import DichVuClient from './DichVuClient';
import RankMathSchema from '@/components/RankMathSchema';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO('dich-vu');
}

export default async function DichVuPage() {
  const services = await getServices();
  console.log(`[DichVuPage] WordPress returned ${services.length} services`);
  return (
    <>
      <RankMathSchema wpPath="/dich-vu/" />
      <DichVuClient services={services} />
    </>
  );
}
