import { generatePageMetadata } from '@/lib/seo';
import GalleryView from '@/views/Gallery/Gallery';

export const metadata = generatePageMetadata('gallery');

export default function GalleryPage() {
  return <GalleryView />;
}
