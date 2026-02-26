import { generatePageMetadata } from '@/lib/seo';
import ChurchesView from '@/views/Churches/Churches';

export const metadata = generatePageMetadata('churches');

export default function ChurchesPage() {
  return <ChurchesView />;
}
