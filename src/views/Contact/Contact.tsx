'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
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

      <Box sx={{ py: 6, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          {/* Contact cards */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 3,
              mb: 6,
            }}
          >
            {contactMethods.map((method) => (
              <ContactCard key={method.title} contact={method} />
            ))}
          </Box>

          {/* Contact form */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: 4,
              mb: 6,
            }}
          >
            <ContactForm />
            <Paper sx={{ p: 0, overflow: 'hidden', borderRadius: 2, minHeight: 350 }}>
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
            </Paper>
          </Box>

          {/* Find Us section */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}>
              Find Us
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {churchInfo.address}
            </Typography>
          </Box>
        </Container>
      </Box>
    </Page>
  );
}
