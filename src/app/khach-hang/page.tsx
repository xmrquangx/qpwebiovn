import React from 'react';
import type { Metadata } from 'next';
import { getTestimonials } from '@/lib/wordpress/services';
import { getPageSEO } from '@/lib/wordpress/seo';
import KhachHangClient from './KhachHangClient';
import RankMathSchema from '@/components/RankMathSchema';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO('khach-hang');
}

export default async function KhachHangPage() {
  const testimonials = await getTestimonials();
  return (
    <>
      <RankMathSchema wpPath="/khach-hang/" />
      <KhachHangClient testimonials={testimonials} />
    </>
  );
}