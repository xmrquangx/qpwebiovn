import React from 'react';
import type { Metadata } from 'next';
import { getContactOptions } from '@/lib/wordpress/services';
import { getPageSEO } from '@/lib/wordpress/seo';
import LienHeClient from './LienHeClient';
import RankMathSchema from '@/components/RankMathSchema';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO('lien-he');
}

export default async function LienHePage() {
  const options = await getContactOptions();
  return (
    <>
      <RankMathSchema wpPath="/lien-he/" />
      <LienHeClient options={options} />
    </>
  );
}
