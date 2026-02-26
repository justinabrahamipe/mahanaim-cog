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

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[900],
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
            mb: 4,
          }}
        >
          {/* Column 1: Church Info */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
              {churchInfo.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1.5 }}>
              <LocationOnIcon fontSize="small" color="primary" sx={{ mt: 0.3 }} />
              <Typography variant="body2" color="text.secondary">
                {churchInfo.address}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <PhoneIcon fontSize="small" color="primary" />
              <Typography variant="body2" color="text.secondary">
                {churchInfo.phone}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon fontSize="small" color="primary" />
              <Typography variant="body2" color="text.secondary">
                {churchInfo.email}
              </Typography>
            </Box>
          </Box>

          {/* Column 2: Quick Links */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
              Quick Links
            </Typography>
            {navItems.map((item) => (
              <Typography
                key={item.label}
                component={Link}
                href={item.href}
                variant="body2"
                sx={{
                  display: 'block',
                  mb: 1,
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>

          {/* Column 3: Map Embed */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
              Find Us
            </Typography>
            <Box
              sx={{
                borderRadius: 1,
                overflow: 'hidden',
                height: 180,
              }}
            >
              <iframe
                src={churchInfo.mapEmbedUrl}
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mahanaim Church of God Location"
              />
            </Box>
          </Box>
        </Box>

        {/* Bottom bar */}
        <Box
          sx={{
            borderTop: 1,
            borderColor: 'divider',
            pt: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} {churchInfo.name} Manchester. All rights reserved.
          </Typography>
          <Box>
            <IconButton
              aria-label="Facebook"
              color="primary"
              href={churchInfo.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-3px)', color: 'secondary.main' },
              }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              aria-label="Instagram"
              color="primary"
              href={churchInfo.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-3px)', color: 'secondary.main' },
              }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              aria-label="YouTube"
              color="primary"
              href={churchInfo.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-3px)', color: 'secondary.main' },
              }}
            >
              <YouTubeIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
