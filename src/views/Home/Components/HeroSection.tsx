'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Image from 'next/image';
import Link from 'next/link';
import { churchInfo } from '@/config/church';
import { ink, wineDeep, gold, creamText, onWineMuted } from '@/theme/tokens';
import type { ServiceTime } from '@/types';

// "9:15 AM - 10:00 AM" -> { start: '9:15', meridiem: 'AM', until: '10:00 AM', minutes: 555 }
function splitTime(time: string) {
  const [startPart, endPart] = time.split('-').map((t) => t.trim());
  const match = startPart.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  const [, h, m, meridiem] = match;
  const hour24 = (Number(h) % 12) + (meridiem.toUpperCase() === 'PM' ? 12 : 0);
  return { start: `${h}:${m}`, meridiem: meridiem.toUpperCase(), until: endPart, minutes: hour24 * 60 + Number(m) };
}

export function sundayServicesInOrder(services: ServiceTime[]) {
  return services
    .filter((s) => s.day === 'Sunday')
    .map((s) => ({ ...s, parsed: splitTime(s.time) }))
    .filter((s) => s.parsed)
    .sort((a, b) => a.parsed!.minutes - b.parsed!.minutes);
}

export default function HeroSection() {
  const sundays = sundayServicesInOrder(churchInfo.services);

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: { xs: '100svh', md: '100vh' },
        maxHeight: { md: 980 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        backgroundColor: wineDeep,
        color: creamText,
      }}
    >
      <Image
        src="/church-group.jpg"
        alt="The Mahanaim congregation gathered together outdoors"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center 65%' }}
      />
      {/* Wine wash: tints the photo into the brand colour while keeping faces readable */}
      <Box sx={{ position: 'absolute', inset: 0, backgroundColor: ink, mixBlendMode: 'multiply', opacity: 0.55 }} />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: [
            'radial-gradient(50% 60% at 0% 100%, rgba(242, 160, 80, 0.12) 0%, transparent 70%)',
            `linear-gradient(to top, ${wineDeep} 0%, rgba(42, 17, 21, 0.82) 30%, rgba(42, 17, 21, 0.2) 65%, rgba(42, 17, 21, 0.55) 100%)`,
          ].join(', '),
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          pt: { xs: 14, md: 18 },
          pb: { xs: 3, md: 5 },
          '@keyframes heroIn': {
            from: { opacity: 0, transform: 'translateY(14px)' },
            to: { opacity: 1, transform: 'none' },
          },
          '& > *': { animation: 'heroIn 800ms cubic-bezier(.2,.7,.2,1) both' },
          '& > *:nth-of-type(2)': { animationDelay: '120ms' },
          '& > *:nth-of-type(3)': { animationDelay: '240ms' },
          '& > *:nth-of-type(4)': { animationDelay: '380ms' },
        }}
      >
        <Typography sx={{ color: gold, fontWeight: 600, mb: 2 }}>Mahanaim Church of God, Manchester</Typography>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.9rem', sm: '4rem', md: '5.4rem' },
            lineHeight: { xs: 1.04, md: 1 },
            letterSpacing: '-0.04em',
            maxWidth: 900,
            mb: 3,
          }}
        >
          Worship with us this Sunday in Manchester
        </Typography>

        <Box sx={{ maxWidth: 560 }}>
          <Typography sx={{ fontSize: { xs: '1.02rem', md: '1.15rem' }, lineHeight: 1.65, color: onWineMuted, mb: 4 }}>
            English and Malayalam-speaking families gather here as one congregation under Pastor{' '}
            {churchInfo.pastor}. Come as you are.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: { xs: 5, md: 7 } }}>
            <Button component={Link} href="#visit" variant="contained" color="secondary" size="large">
              Plan a visit
            </Button>
            <Button
              component={Link}
              href="/sermons"
              variant="outlined"
              size="large"
              sx={{
                color: creamText,
                borderColor: 'rgba(251, 244, 239, 0.45)',
                '&:hover': { borderColor: creamText, backgroundColor: 'rgba(251, 244, 239, 0.08)' },
              }}
            >
              Watch a sermon
            </Button>
          </Box>
        </Box>

        {sundays.length > 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr 1fr', md: `1.3fr repeat(${sundays.length}, 1fr)` },
              borderRadius: '22px',
              border: '1px solid rgba(251, 244, 239, 0.16)',
              backgroundColor: 'rgba(75, 30, 38, 0.55)',
              backdropFilter: 'blur(18px) saturate(140%)',
              WebkitBackdropFilter: 'blur(18px) saturate(140%)',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                gridColumn: { xs: '1 / -1', md: 'auto' },
                display: 'flex',
                gap: 1.25,
                p: { xs: 2.5, md: 3 },
                borderBottom: { xs: '1px solid rgba(251, 244, 239, 0.12)', md: 'none' },
              }}
            >
              <LocationOnOutlinedIcon sx={{ color: gold, fontSize: 20, mt: '2px' }} />
              <Box>
                <Typography sx={{ color: gold, fontWeight: 600, fontSize: '0.88rem' }}>Every Sunday</Typography>
                <Typography sx={{ fontSize: '0.92rem', color: onWineMuted, lineHeight: 1.5, mt: 0.5 }}>
                  {churchInfo.address}
                </Typography>
              </Box>
            </Box>
            {sundays.map((service, i) => (
              <Box
                key={service.title}
                sx={{
                  p: { xs: 2.5, md: 3 },
                  borderLeft: {
                    xs: i % 2 === 1 ? '1px solid rgba(251, 244, 239, 0.12)' : 'none',
                    md: '1px solid rgba(251, 244, 239, 0.12)',
                  },
                  borderTop: { xs: i >= 2 ? '1px solid rgba(251, 244, 239, 0.12)' : 'none', md: 'none' },
                  gridColumn: { xs: i === sundays.length - 1 && i % 2 === 0 ? '1 / -1' : 'auto', md: 'auto' },
                }}
              >
                <Typography sx={{ fontWeight: 300, letterSpacing: '-0.03em', fontSize: { xs: '2rem', md: '2.4rem' }, lineHeight: 1 }}>
                  {service.parsed!.start}
                  <Box component="span" sx={{ color: gold, fontSize: '0.8rem', fontWeight: 600, letterSpacing: 0, ml: 0.75 }}>
                    {service.parsed!.meridiem}
                  </Box>
                </Typography>
                <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', mt: 1 }}>{service.title}</Typography>
                {service.parsed!.until && (
                  <Typography sx={{ fontSize: '0.82rem', color: onWineMuted }}>Until {service.parsed!.until}</Typography>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
