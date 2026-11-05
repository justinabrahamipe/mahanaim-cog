'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import ContactLinks from '@/components/ContactLinks/ContactLinks';
import { gold, wineGlowBg, wineShadow } from '@/theme/tokens';
import { Leader } from '@/types';

const PLACEHOLDER_IMAGE = '/mahanaim-logo.png';

const contactOf = (leader: Leader) => ({
  phone: leader.phone,
  whatsapp: leader.whatsapp,
  facebook: leader.facebookUrl,
});

// "Evg. Gibin Abraham" -> "GA"
const initials = (name: string) =>
  name
    .replace(/^(Pr|Evg|Br|Sr|Rev|Dr)\.?\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

// Pastoral team: portrait card.
export default function LeaderCard({ leader }: { leader: Leader }) {
  const hasPhoto = leader.imageUrl && leader.imageUrl !== PLACEHOLDER_IMAGE;

  return (
    <Box component="article" sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '4 / 5',
          borderRadius: '24px',
          overflow: 'hidden',
          mb: 2,
          boxShadow: wineShadow,
          background: wineGlowBg,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {hasPhoto ? (
          <Image
            src={leader.imageUrl}
            alt={leader.name}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 280px"
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
        ) : (
          <Typography aria-hidden sx={{ color: gold, fontWeight: 300, fontSize: '4rem', letterSpacing: '-0.04em' }}>
            {initials(leader.name)}
          </Typography>
        )}
      </Box>
      <Typography variant="h6" component="h3" sx={{ fontSize: '1.15rem' }}>
        {leader.name}
      </Typography>
      <Typography sx={{ color: 'secondary.main', fontWeight: 500, fontSize: '0.92rem', mb: 1.5 }}>{leader.designation}</Typography>
      <ContactLinks contact={contactOf(leader)} label={leader.name} />
    </Box>
  );
}

// Everyone else: name, role and contact links, no photo.
export function LeaderRow({ leader }: { leader: Leader }) {
  return (
    <Box
      component="li"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        py: 1.75,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontWeight: 600 }}>{leader.name}</Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>{leader.designation}</Typography>
      </Box>
      <ContactLinks contact={contactOf(leader)} label={leader.name} />
    </Box>
  );
}
