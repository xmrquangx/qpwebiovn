import React from 'react';
import { getServices } from '@/lib/wordpress/services';
import DichVuClient from './DichVuClient';

export default async function DichVuPage() {
  const services = await getServices();
  console.log(`[DichVuPage] WordPress returned ${services.length} services`);
  return <DichVuClient services={services} />;
}
