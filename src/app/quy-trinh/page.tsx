import React from 'react';
import { getProcessSteps, getFAQs } from '@/lib/wordpress/services';
import QuyTrinhClient from './QuyTrinhClient';

export const dynamic = 'force-dynamic';
export default async function QuyTrinhPage() {
  const [steps, faqs] = await Promise.all([
    getProcessSteps(),
    getFAQs('quy-trinh'),
  ]);
  return <QuyTrinhClient steps={steps} faqs={faqs} />;
}
