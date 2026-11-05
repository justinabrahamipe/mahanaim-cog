'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { churchInfo } from '@/config/church';
import { Eyebrow } from '@/components/Page/Components/SectionHeading';
import { wineShadow } from '@/theme/tokens';
import { sundayServicesInOrder } from './HeroSection';
import { directionsUrl } from './AboutPreview';

export default function VisitSection() {
  const sundays = sundayServicesInOrder(churchInfo.services);
  const first = sundays[0];
  const last = sundays[sundays.length - 1];

  // A first Sunday, in the order it actually happens.
  const steps = [
    first && {
      title: `Arrive for ${first.parsed!.start} ${first.parsed!.meridiem}`,
      text: `${first.title} starts the morning, and the welcome team will meet you at the door.`,
    },
    {
      title: 'Bring the children',
      text: 'Sunday School runs alongside the early service, so the whole family has a place.',
    },
    last && {
      title: `Stay for the ${last.title}`,
      text: `It runs until ${last.parsed!.until}, and there is time afterwards to meet the pastor.`,
    },
  ].filter(Boolean) as { title: string; text: string }[];

  return (
    <Box component="section" id="visit" sx={{ py: { xs: 9, md: 12 }, backgroundColor: 'background.default', scrollMarginTop: 64 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 5, md: 8 }, alignItems: 'center' }}>
          <Box>
            <Eyebrow>Your first visit</Eyebrow>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.3rem', md: '3.25rem' }, mb: 4 }}>
              We&rsquo;d love to welcome you
            </Typography>

            <Box component="ol" sx={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2.5, mb: 4.5 }}>
              {steps.map((step, i) => (
                <Box component="li" key={step.title} sx={{ display: 'flex', gap: 2 }}>
                  <Box
                    aria-hidden
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      flexShrink: 0,
                      display: 'grid',
                      placeItems: 'center',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      backgroundColor: (theme) => theme.palette.grey[50],
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    {i + 1}
                  </Box>
                  <Box sx={{ pt: '4px' }}>
                    <Typography sx={{ fontWeight: 600 }}>{step.title}</Typography>
                    <Typography sx={{ color: 'text.secondary', lineHeight: 1.6 }}>{step.text}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <Button href={directionsUrl} target="_blank" rel="noopener noreferrer" variant="contained" color="primary" size="large">
                Get directions
              </Button>
              <Button
                href={`mailto:${churchInfo.email}`}
                variant="outlined"
                color="primary"
                size="large"
                sx={{ borderColor: 'divider' }}
              >
                Email us
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              borderRadius: '28px',
              overflow: 'hidden',
              border: '6px solid',
              borderColor: 'background.paper',
              boxShadow: wineShadow,
              height: { xs: 300, md: 420 },
            }}
          >
            <iframe
              src={churchInfo.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map showing Mahanaim Church of God"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
