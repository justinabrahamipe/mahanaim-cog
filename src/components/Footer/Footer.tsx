'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Link from 'next/link';
import { churchInfo, navItems } from '@/config/church';
import { ink, accent } from '@/theme/tokens';

const FOOTER_TEXT = 'rgba(243, 238, 230, 0.75)';

export default function Footer() {
  return (
    <Box component="footer" sx={{ backgroundColor: ink, color: '#F3EEE6', mt: 'auto' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 5,
            mb: 5,
          }}
        >
          <Box>
            <Typography sx={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', mb: 2 }}>
              {churchInfo.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25, mb: 1.5 }}>
              <LocationOnIcon fontSize="small" sx={{ color: accent, mt: 0.3 }} />
              <Typography variant="body2" sx={{ color: FOOTER_TEXT }}>
                {churchInfo.address}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.5 }}>
              <PhoneIcon fontSize="small" sx={{ color: accent }} />
              <Typography variant="body2" sx={{ color: FOOTER_TEXT }}>
                {churchInfo.phone}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
              <EmailIcon fontSize="small" sx={{ color: accent }} />
              <Typography variant="body2" sx={{ color: FOOTER_TEXT }}>
                {churchInfo.email}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography sx={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', mb: 2 }}>
              Find your way around
            </Typography>
            {navItems.map((item) => (
              <Typography
                key={item.label}
                component={Link}
                href={item.href}
                variant="body2"
                sx={{
                  display: 'block',
                  mb: 1.25,
                  color: FOOTER_TEXT,
                  textDecoration: 'none',
                  width: 'fit-content',
                  '&:hover': { color: accent },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>

          <Box>
            <Typography sx={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', mb: 2 }}>
              Find us
            </Typography>
            <Box sx={{ border: '1.5px solid rgba(243,238,230,0.16)', borderRadius: '3px', overflow: 'hidden', height: 170 }}>
              <iframe
                src={churchInfo.mapEmbedUrl}
                width="100%"
                height="170"
                style={{ border: 0, filter: 'grayscale(0.3) contrast(1.05)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mahanaim Church of God Location"
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            borderTop: '1px solid rgba(243,238,230,0.14)',
            pt: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: FOOTER_TEXT }}>
            &copy; {new Date().getFullYear()} {churchInfo.name}, Manchester.
          </Typography>
          <Box>
            {[
              { Icon: FacebookIcon, href: churchInfo.socialLinks.facebook, label: 'Facebook' },
              { Icon: InstagramIcon, href: churchInfo.socialLinks.instagram, label: 'Instagram' },
              { Icon: YouTubeIcon, href: churchInfo.socialLinks.youtube, label: 'YouTube' },
            ].map(({ Icon, href, label }) => (
              <IconButton
                key={label}
                aria-label={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: FOOTER_TEXT, '&:hover': { color: accent } }}
              >
                <Icon />
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
