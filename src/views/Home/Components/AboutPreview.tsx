'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import Link from 'next/link';
import { churchInfo } from '@/config/church';
import { churches, churchSlug } from '@/config/churches';
import { Eyebrow } from '@/components/Page/Components/SectionHeading';
import { wineGlowBg, creamText, onWineMuted, wineShadow } from '@/theme/tokens';

export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(churchInfo.address)}`;

export default function AboutPreview() {
  const branches = churches.filter((c) => !c.isMotherChurch);
  const stats = [
    { value: String(churches.length), label: 'congregations' },
    { value: '2', label: 'languages of worship' },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 9, md: 13 },
        background: (theme) =>
          `linear-gradient(115deg, ${theme.palette.grey[50]} 0%, ${theme.palette.background.default} 60%)`,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 6, md: 8 }, alignItems: 'start' }}>
          <Box>
            <Eyebrow>About our church</Eyebrow>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.4rem', md: '3.4rem' }, mb: 3 }}>
              One church family, two languages
            </Typography>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.75, fontSize: '1.05rem', mb: 2, maxWidth: 520 }}>
              {churchInfo.name} is a Pentecostal church in Manchester and part of the{' '}
              <Box component="strong" sx={{ color: 'text.primary', fontWeight: 600 }}>
                Church of God
              </Box>{' '}
              family.
            </Typography>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.75, fontSize: '1.05rem', mb: 4, maxWidth: 520 }}>
              Every Sunday we worship in English and Malayalam, here in Manchester and with sister churches in towns
              across England and Wales.
            </Typography>

            <Box sx={{ display: 'flex', gap: { xs: 4, md: 6 }, mb: 4.5 }}>
              {stats.map((stat) => (
                <Box key={stat.label}>
                  <Typography sx={{ fontWeight: 300, fontSize: { xs: '2.6rem', md: '3.2rem' }, letterSpacing: '-0.04em', lineHeight: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', mt: 0.75 }}>{stat.label}</Typography>
                </Box>
              ))}
            </Box>

            <Button component={Link} href="/about" variant="contained" color="primary" size="large">
              Read our story
            </Button>
          </Box>

          <Box>
            <Box
              sx={{
                background: wineGlowBg,
                color: creamText,
                borderRadius: '24px',
                p: { xs: 3, md: 3.5 },
                display: 'flex',
                alignItems: { xs: 'flex-start', sm: 'flex-end' },
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2.5,
                boxShadow: wineShadow,
                mb: 4,
              }}
            >
              <Box>
                <Eyebrow onDark>Main church</Eyebrow>
                <Typography sx={{ fontWeight: 300, fontSize: { xs: '2.2rem', md: '2.6rem' }, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                  Manchester
                </Typography>
                <Typography sx={{ color: onWineMuted, fontSize: '0.92rem', mt: 1 }}>{churchInfo.address}</Typography>
              </Box>
              <Button
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                color="secondary"
                startIcon={<NearMeOutlinedIcon />}
                sx={{ flexShrink: 0 }}
              >
                Directions
              </Button>
            </Box>

            <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: 'text.secondary', mb: 1.5 }}>
              Also across the UK
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
              {branches.map((church) => (
                <Box component="li" key={church.location}>
                  <Box
                    component={Link}
                    href={`/churches#${churchSlug(church.location)}`}
                    sx={{
                      display: 'block',
                      px: 1.75,
                      py: 0.9,
                      borderRadius: '12px',
                      border: '1px solid',
                      borderColor: 'divider',
                      backgroundColor: 'background.paper',
                      color: 'text.primary',
                      textDecoration: 'none',
                      transition: 'border-color 160ms ease, box-shadow 160ms ease',
                      '&:hover': { borderColor: 'secondary.main', boxShadow: wineShadow },
                    }}
                  >
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.3 }}>
                      {church.location.split(',')[0]}
                    </Typography>
                    {church.county && (
                      <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', lineHeight: 1.3 }}>{church.county}</Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
            <Box
              component={Link}
              href="/churches"
              sx={{ color: 'secondary.main', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              See every branch and its pastor
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
