'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { panelSx } from '@/theme/motif';
import { accent } from '@/theme/tokens';
import { Leader } from '@/types';

interface LeaderCardProps {
  leader: Leader;
}

export default function LeaderCard({ leader }: LeaderCardProps) {
  return (
    <Card sx={{ ...panelSx, height: '100%', textAlign: 'center', backgroundColor: 'background.paper' }}>
      <CardContent sx={{ p: 3 }}>
        <Avatar
          src={leader.imageUrl}
          alt={leader.name}
          sx={{ width: 112, height: 112, mx: 'auto', mb: 2, border: '2px solid', borderColor: 'text.primary' }}
        />
        <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>{leader.name}</Typography>
        <Typography sx={{ color: accent, mb: 2, fontWeight: 600, fontSize: '0.9rem' }}>
          {leader.designation}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          {leader.phone && (
            <IconButton
              href={`tel:${leader.phone}`}
              size="small"
              sx={{ color: 'text.primary', '&:hover': { color: accent } }}
            >
              <PhoneIcon />
            </IconButton>
          )}
          {leader.whatsapp && (
            <IconButton
              href={`https://wa.me/${leader.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{ color: 'text.primary', '&:hover': { color: accent } }}
            >
              <WhatsAppIcon />
            </IconButton>
          )}
          {leader.facebookUrl && (
            <IconButton
              href={leader.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{ color: 'text.primary', '&:hover': { color: accent } }}
            >
              <FacebookIcon />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
