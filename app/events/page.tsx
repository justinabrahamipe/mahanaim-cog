import { generatePageMetadata } from '@/lib/seo';
import EventsView from '@/views/Events/Events';

export const metadata = generatePageMetadata('events');

export default function EventsPage() {
  return <EventsView />;
}
