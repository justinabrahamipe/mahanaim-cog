import { generatePageMetadata } from '@/lib/seo';
import LeadershipView from '@/views/Leadership/Leadership';

export const metadata = generatePageMetadata('leadership');

export default function LeadershipPage() {
  return <LeadershipView />;
}
