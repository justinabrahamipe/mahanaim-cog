'use client';
import Page from '@/components/Page/Page';
import HeroSection from './Components/HeroSection';
import PastorMessage from './Components/PastorMessage';
import MeetingInfo from './Components/MeetingInfo';
import AboutPreview from './Components/AboutPreview';

export default function Home() {
  return (
    <Page transparentHeader>
      <HeroSection />
      <PastorMessage />
      <AboutPreview />
      <MeetingInfo />
    </Page>
  );
}
