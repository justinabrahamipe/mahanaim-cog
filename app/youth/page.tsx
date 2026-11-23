import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/seo';
import { features } from '@/config/features';
import YouthView from '@/views/Youth/Youth';

export const metadata = generatePageMetadata('youth');

export default function YouthPage() {
  if (!features.youthReels) notFound();
  return <YouthView />;
}
