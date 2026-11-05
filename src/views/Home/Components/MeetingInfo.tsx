'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { churchInfo } from '@/config/church';
import SectionHeading from '@/components/Page/Components/SectionHeading';

export default function MeetingInfo() {
  return (
    <Box component="section" sx={{ py: { xs: 9, md: 12 }, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <SectionHeading
          eyebrow="Through the week"
          title="Every gathering, every week"
          intro="Sunday is the heart of it, but the church meets to pray most days of the week."
          action={{ label: 'See upcoming events', href: '/events' }}
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          {churchInfo.services.map((service) => (
            <Box
              key={service.title}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '170px 1fr' },
                gap: { xs: 1, sm: 3 },
                p: { xs: 2.5, md: 3 },
                borderRadius: '20px',
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper',
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>{service.day}</Typography>
                {service.time && (
                  <Typography sx={{ color: 'secondary.main', fontWeight: 500, fontSize: '0.88rem' }}>{service.time}</Typography>
                )}
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontSize: '1.08rem', mb: 0.5 }}>
                  {service.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: '0.95rem' }}>{service.description}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
