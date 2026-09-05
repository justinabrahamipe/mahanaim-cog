'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { churchInfo } from '@/config/church';
import { accent } from '@/theme/tokens';

export default function MeetingInfo() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 5 }}>
          <Typography variant="h3" sx={{ fontSize: { xs: '1.9rem', md: '2.3rem' } }}>
            Find a service that fits your week
          </Typography>
        </Box>

        <Box sx={{ borderTop: '1.5px solid', borderColor: 'divider' }}>
          {churchInfo.services.map((service) => (
            <Box
              key={service.title}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '200px 1fr' },
                gap: { xs: 0.5, sm: 4 },
                py: 3,
                borderBottom: '1.5px solid',
                borderColor: 'divider',
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: '1.05rem' }}>{service.day}</Typography>
                <Typography sx={{ color: accent, fontWeight: 600, fontSize: '0.92rem' }}>
                  {service.time}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 0.5 }}>{service.title}</Typography>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.6, maxWidth: 560 }}>
                  {service.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
