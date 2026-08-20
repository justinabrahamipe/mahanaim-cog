import { generatePageMetadata } from '@/lib/seo';
import MagazineView from '@/views/Magazine/Magazine';

export const metadata = generatePageMetadata('magazine');

export default function MagazinePage() {
  return <MagazineView />;
}
