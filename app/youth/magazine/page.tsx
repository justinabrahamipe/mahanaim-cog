import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/seo';
import { features } from '@/config/features';
import MagazineView from '@/views/Magazine/Magazine';

export const metadata = generatePageMetadata('magazine');

export default function MagazinePage() {
  if (!features.magazine) notFound();
  return <MagazineView />;
}
