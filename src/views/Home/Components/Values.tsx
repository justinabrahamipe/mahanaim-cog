'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import SectionHeading from '@/components/Page/Components/SectionHeading';
import { ink, gold } from '@/theme/tokens';

const values = [
  {
    Icon: MenuBookOutlinedIcon,
    title: 'The Word',
    description: 'The Bible is God’s living Word. Every service is built on reading it and teaching it plainly.',
  },
  {
    Icon: VolunteerActivismOutlinedIcon,
    title: 'Prayer',
    description: 'We pray together on Sundays, on weeknights and through monthly fasting prayer.',
  },
  {
    Icon: AutoAwesomeOutlinedIcon,
    title: 'Spirit-filled worship',
    description: 'We worship in spirit and in truth, expecting the Holy Spirit to move among us.',
  },
];

export default function Values() {
  return (
    <Box component="section" sx={{ py: { xs: 9, md: 12 }, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <SectionHeading eyebrow="What we hold to" title="Rooted in Word, prayer and worship" />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2.5 }}>
          {values.map(({ Icon, title, description }) => (
            <Box
              key={title}
              sx={{
                p: { xs: 3, md: 3.5 },
                borderRadius: '22px',
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: (theme) => theme.palette.grey[50],
              }}
            >
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: '14px',
                  backgroundColor: ink,
                  color: gold,
                  display: 'grid',
                  placeItems: 'center',
                  mb: 3,
                }}
              >
                <Icon fontSize="small" />
              </Box>
              <Typography variant="h5" sx={{ fontSize: '1.25rem', mb: 1 }}>
                {title}
              </Typography>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.65 }}>{description}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
