'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Link from 'next/link';
import { churchInfo } from '@/config/church';
import { ink } from '@/theme/tokens';

export default function HeroSection() {
  const sundayServices = churchInfo.services.filter(
    (s) => s.title.includes('English Worship') || s.title.includes('Malayalam')
  );

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        height: { xs: '92vh', sm: '92vh', md: '100vh' },
        minHeight: { xs: 600, md: 700 },
        maxHeight: { md: 920 },
        width: '100%',
        overflow: 'hidden',
        backgroundColor: ink,
      }}
    >
      {/* The photo, in its natural colour */}
      <Image
        src="/church-group.jpg"
        alt="The Mahanaim congregation gathered together outdoors"
        fill
        priority
        sizes="100vw"
        style={{
          objectFit: 'cover',
          objectPosition: 'center 68%',
        }}
      />
      {/* Ink wash, just enough to keep the overlaid type legible */}
      <Box sx={{ position: 'absolute', inset: 0, backgroundColor: ink, mixBlendMode: 'multiply', opacity: 0.58 }} />
      {/* Just enough scrim at the very top/bottom for nav and type legibility */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(20,16,14,0.55) 0%, transparent 18%), linear-gradient(to top, rgba(10,8,7,0.85) 0%, rgba(10,8,7,0.55) 30%, transparent 55%)',
        }}
      />
      {/* Vignette: darkens in from all four sides, keeping the centre brightest */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 22%, rgba(8,6,5,0.85) 100%)',
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: 'absolute',
          left: '50%',
          bottom: { xs: 28, sm: 40, md: 64 },
          transform: 'translateX(-50%)',
          '@keyframes riseIn': {
            from: { opacity: 0, transform: 'translateX(-50%) translateY(14px)' },
            to: { opacity: 1, transform: 'translateX(-50%) translateY(0)' },
          },
          animation: 'riseIn 700ms ease both',
        }}
      >
        {/* Glass panel: frosted, tinted with the accent, solidifies slightly on hover */}
        <Box
          sx={{
            display: 'inline-block',
            color: '#F3EEE6',
            p: { xs: 3, sm: 4, md: 5 },
            borderRadius: '6px',
            border: '1px solid rgba(243,238,230,0.18)',
            backgroundColor: 'rgba(120, 35, 22, 0.44)',
            backdropFilter: 'blur(16px) saturate(160%)',
            WebkitBackdropFilter: 'blur(16px) saturate(160%)',
            transition: 'background-color 300ms ease, border-color 300ms ease',
            '&:hover': {
              backgroundColor: 'rgba(120, 35, 22, 0.6)',
              borderColor: 'rgba(243,238,230,0.3)',
            },
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: 'rgba(243,238,230,0.8)', mb: 2 }}>
            Mahanaim Church of God, Manchester
          </Typography>

          <Typography
            variant="h1"
            sx={{ fontSize: { xs: '3rem', sm: '4rem', md: '5.5rem' }, lineHeight: 0.95, fontWeight: 700, mb: 2 }}
          >
            Mahanaim
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: '0.98rem', md: '1.08rem' },
              lineHeight: 1.65,
              color: 'rgba(243,238,230,0.82)',
              maxWidth: 560,
              mb: 4,
            }}
          >
            English and Malayalam-speaking believers gather here as one congregation, week after
            week, under Pastor Biju Cherian. Come and see what that looks like on a Sunday.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: sundayServices.length ? 4 : 0 }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/contact"
              sx={{ backgroundColor: '#F3EEE6', color: ink, '&:hover': { backgroundColor: '#fff' } }}
            >
              Contact us
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              href="/sermons"
              sx={{
                borderColor: 'rgba(243,238,230,0.6)',
                color: '#F3EEE6',
                '&:hover': { borderColor: '#F3EEE6', backgroundColor: 'rgba(243,238,230,0.08)' },
              }}
            >
              Watch a message
            </Button>
          </Box>

          {sundayServices.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                gap: { xs: 3, sm: 5 },
                flexWrap: 'wrap',
                pt: 3,
                borderTop: '1.5px solid rgba(243,238,230,0.25)',
                maxWidth: 560,
              }}
            >
              {sundayServices.map((service) => (
                <Box key={service.title}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.85rem' }}>{service.title}</Typography>
                  <Typography sx={{ color: 'rgba(243,238,230,0.75)', fontWeight: 600, fontSize: '0.85rem' }}>
                    {service.time}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
