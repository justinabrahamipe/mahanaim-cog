'use client';
import Page from '@/components/Page/Page';
import PageBanner from '@/components/Page/Components/PageBanner';
import PageTitle from '@/components/Page/Components/PageTitle';
import AboutContent from './Components/AboutContent';

export default function About() {
  return (
    <Page>
      <PageBanner>
        <PageTitle title="About Us" subtitle="Learn more about our church, vision, and values" />
      </PageBanner>
      <AboutContent />
    </Page>
  );
}
