'use client';
import Page from '@/components/Page/Page';
import HeroSection from './Components/HeroSection';
import AboutPreview from './Components/AboutPreview';
import Values from './Components/Values';
import PastorMessage from './Components/PastorMessage';
import MeetingInfo from './Components/MeetingInfo';
import PrayerPanel from './Components/PrayerPanel';
import VisitSection from './Components/VisitSection';

export default function Home() {
  return (
    <Page transparentHeader>
      <HeroSection />
      <AboutPreview />
      <Values />
      <PastorMessage />
      <MeetingInfo />
      <PrayerPanel />
      <VisitSection />
    </Page>
  );
}
