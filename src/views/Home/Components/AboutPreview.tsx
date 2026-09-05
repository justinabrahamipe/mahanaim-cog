'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { accent } from '@/theme/tokens';

const values = [
  {
    title: 'Faith',
    description: 'We trust God to guide our lives, and we build everything else on that.',
  },
  {
    title: 'Community',
    description: 'A welcoming family that supports and cares for one another, in two languages.',
  },
  {
    title: 'Scripture',
    description: 'Grounded in the Word of God and committed to biblical teaching.',
  },
];

export default function AboutPreview() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.2fr' }, gap: { xs: 5, md: 8 } }}>
          <Box>
            <Typography variant="h3" sx={{ fontSize: { xs: '1.9rem', md: '2.3rem' }, mb: 2.5 }}>
              A church built for two languages, one family
            </Typography>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3, fontSize: '1.05rem' }}>
              Mahanaim Church of God is a Protestant community in Manchester dedicated to worship,
              fellowship, and serving our neighbours. Under Pastor Biju Cherian, we welcome anyone —
              whatever language you pray in.
            </Typography>
            <Button
              component={Link}
              href="/about"
              variant="text"
              sx={{
                px: 0,
                fontWeight: 700,
                color: 'text.primary',
                textDecoration: 'underline',
                textDecorationColor: accent,
                textDecorationThickness: '2px',
                textUnderlineOffset: '4px',
                '&:hover': { backgroundColor: 'transparent', color: accent },
              }}
            >
              Read our story
            </Button>
          </Box>

          <Box>
            {values.map((value, i) => (
              <Box
                key={value.title}
                sx={{
                  display: 'flex',
                  gap: 3,
                  py: 3,
                  borderTop: i === 0 ? '1.5px solid' : '1.5px solid',
                  borderColor: 'divider',
                  ...(i === values.length - 1 && { borderBottom: '1.5px solid', borderBottomColor: 'divider' }),
                }}
              >
                <Box sx={{ width: 12, height: 12, backgroundColor: accent, flexShrink: 0, mt: '6px' }} />
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.15rem', mb: 0.5 }}>{value.title}</Typography>
                  <Typography sx={{ color: 'text.secondary', lineHeight: 1.6 }}>{value.description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
