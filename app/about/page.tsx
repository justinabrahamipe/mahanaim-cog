import { generatePageMetadata } from '@/lib/seo';
import AboutView from '@/views/About/About';

export const metadata = generatePageMetadata('about');

export default function AboutPage() {
  return <AboutView />;
}
