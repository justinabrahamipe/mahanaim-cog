import { generatePageMetadata } from '@/lib/seo';
import SermonsView from '@/views/Sermons/Sermons';

export const metadata = generatePageMetadata('sermons');

export default function SermonsPage() {
  return <SermonsView />;
}
