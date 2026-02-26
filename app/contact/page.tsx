import { generatePageMetadata } from '@/lib/seo';
import ContactView from '@/views/Contact/Contact';

export const metadata = generatePageMetadata('contact');

export default function ContactPage() {
  return <ContactView />;
}
