import { getContactOptions } from '@/lib/wordpress/services';
import LienHeClient from './LienHeClient';

export const dynamic = 'force-dynamic';

export default async function LienHePage() {
  const options = await getContactOptions();
  return <LienHeClient options={options} />;
}
