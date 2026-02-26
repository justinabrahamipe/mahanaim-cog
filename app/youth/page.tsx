import { generatePageMetadata } from '@/lib/seo';
import YouthView from '@/views/Youth/Youth';

export const metadata = generatePageMetadata('youth');

export default function YouthPage() {
  return <YouthView />;
}
