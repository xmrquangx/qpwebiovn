import React from 'react';
import { getTestimonials } from '@/lib/wordpress/services';
import KhachHangClient from './KhachHangClient';

export const dynamic = 'force-dynamic';
export default async function KhachHangPage() {
  const testimonials = await getTestimonials();
  return <KhachHangClient testimonials={testimonials} />;
}