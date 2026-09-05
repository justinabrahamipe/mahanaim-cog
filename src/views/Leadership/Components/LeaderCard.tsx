'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
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
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 2 }}>
          {leader.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
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
          {leader.whatsappUrl && (
            <IconButton
              href={leader.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{ color: 'text.primary', '&:hover': { color: accent } }}
            >
              <WhatsAppIcon />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
