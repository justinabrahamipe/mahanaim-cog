'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { churchInfo, navItems } from '@/config/church';
import { Wordmark } from '@/components/Header/Header';
import { gold, creamText, onWineMuted, wineGlowBg } from '@/theme/tokens';

const linkSx = {
  display: 'block',
  width: 'fit-content',
  color: creamText,
  textDecoration: 'none',
  fontSize: '0.95rem',
  py: 0.5,
  transition: 'color 160ms ease',
  '&:hover': { color: gold },
};

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <Typography component="h2" sx={{ color: gold, fontWeight: 600, fontSize: '0.95rem', mb: 2 }}>
      {children}
    </Typography>
  );
}

export default function Footer() {
  const sundayServices = churchInfo.services.filter((s) => s.day === 'Sunday');
  const socials = [
    { label: 'Facebook', href: churchInfo.socialLinks.facebook },
    { label: 'YouTube', href: churchInfo.socialLinks.youtube },
    { label: 'Instagram', href: churchInfo.socialLinks.instagram },
  ];

  return (
    <Box component="footer" sx={{ background: wineGlowBg, color: creamText, mt: 'auto' }}>
      <Container maxWidth="lg" sx={{ pt: { xs: 7, md: 9 }, pb: 4 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1.4fr 1.1fr 0.9fr 1.1fr' },
            gap: { xs: 5, md: 4 },
            mb: { xs: 6, md: 8 },
          }}
        >
          <Box>
            <Wordmark size="lg" />
            <Typography sx={{ color: onWineMuted, mt: 2.5, mb: 3, maxWidth: 300, lineHeight: 1.65, fontSize: '0.95rem' }}>
              A Pentecostal church in Manchester worshipping in English and Malayalam, part of the Church of God family.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap' }}>
              {socials.map(({ label, href }) => (
                <Box
                  key={label}
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ ...linkSx, fontWeight: 600, py: 0 }}
                >
                  {label}
                </Box>
              ))}
            </Box>
          </Box>

          <Box>
            <ColumnHeading>Find us</ColumnHeading>
            <Typography sx={{ lineHeight: 1.65, mb: 1.5, fontSize: '0.95rem', maxWidth: 240 }}>{churchInfo.address}</Typography>
            <Box component="a" href={`tel:${churchInfo.phone.replace(/\s/g, '')}`} sx={linkSx}>
              {churchInfo.phone}
            </Box>
            <Box component="a" href={`mailto:${churchInfo.email}`} sx={linkSx}>
              {churchInfo.email}
            </Box>
          </Box>

          <Box component="nav" aria-label="Footer">
            <ColumnHeading>Explore</ColumnHeading>
            {navItems.map((item) => (
              <Box key={item.label} component={Link} href={item.href} sx={linkSx}>
                {item.label}
              </Box>
            ))}
          </Box>

          <Box>
            <ColumnHeading>Sundays</ColumnHeading>
            {sundayServices.map((service) => (
              <Box key={service.title} sx={{ mb: 1.75 }}>
                <Typography sx={{ fontSize: '0.95rem' }}>{service.title}</Typography>
                <Typography sx={{ fontSize: '0.85rem', color: onWineMuted }}>{service.time}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            borderTop: '1px solid rgba(251, 244, 239, 0.12)',
            pt: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            gap: 1.5,
          }}
        >
          <Typography sx={{ color: onWineMuted, fontSize: '0.85rem' }}>
            &copy; {new Date().getFullYear()} {churchInfo.name}, Manchester
          </Typography>
          <Box component={Link} href="/sitemap.xml" sx={{ ...linkSx, color: onWineMuted, fontSize: '0.85rem', py: 0 }}>
            Sitemap
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
