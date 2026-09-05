'use client';
import Page from '@/components/Page/Page';
import HeroSection from './Components/HeroSection';
import MeetingInfo from './Components/MeetingInfo';
import AboutPreview from './Components/AboutPreview';

export default function Home() {
  return (
    <Page transparentHeader>
      <HeroSection />
      <AboutPreview />
      <MeetingInfo />
    </Page>
  );
}
