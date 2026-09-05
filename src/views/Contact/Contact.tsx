'use client';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Page from '@/components/Page/Page';
import PageBanner from '@/components/Page/Components/PageBanner';
import PageTitle from '@/components/Page/Components/PageTitle';
import ContactCard from './Components/ContactCard';
import ContactForm from './Components/ContactForm';
import { contactMethods } from '@/config/contacts';
import { churchInfo } from '@/config/church';

export default function Contact() {
  return (
    <Page>
      <PageBanner>
        <PageTitle title="Contact Us" subtitle="We would love to hear from you" />
      </PageBanner>

      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 3,
              mb: 7,
            }}
          >
            {contactMethods.map((method) => (
              <ContactCard key={method.title} contact={method} />
            ))}
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: 4,
            }}
          >
            <ContactForm />
            <Box sx={{ border: '1.5px solid', borderColor: 'divider', overflow: 'hidden', minHeight: 350 }}>
              <iframe
                src={churchInfo.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 350 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mahanaim Church of God Location"
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </Page>
  );
}
