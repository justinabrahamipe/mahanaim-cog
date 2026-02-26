'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Leader } from '@/types';

interface LeaderCardProps {
  leader: Leader;
}

export default function LeaderCard({ leader }: LeaderCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        textAlign: 'center',
        p: 3,
        transition: 'all 0.3s ease',
        border: '2px solid transparent',
        '&:hover': {
          transform: 'translateY(-8px)',
          borderColor: 'primary.main',
          boxShadow: (theme) =>
            theme.palette.mode === 'light'
              ? '0 12px 24px rgba(0, 0, 0, 0.12)'
              : '0 12px 24px rgba(0, 0, 0, 0.4)',
        },
      }}
    >
      <CardContent>
        <Avatar
          src={leader.imageUrl}
          alt={leader.name}
          sx={{
            width: 120,
            height: 120,
            mx: 'auto',
            mb: 2,
            border: '3px solid',
            borderColor: 'primary.main',
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
          {leader.name}
        </Typography>
        <Typography variant="subtitle2" color="secondary.main" sx={{ mb: 2, fontWeight: 600 }}>
          {leader.designation}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.7, mb: 2 }}
        >
          {leader.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          {leader.facebookUrl && (
            <IconButton
              href={leader.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              size="small"
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-3px)', color: 'secondary.main' },
              }}
            >
              <FacebookIcon />
            </IconButton>
          )}
          {leader.whatsappUrl && (
            <IconButton
              href={leader.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              size="small"
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-3px)', color: 'secondary.main' },
              }}
            >
              <WhatsAppIcon />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
