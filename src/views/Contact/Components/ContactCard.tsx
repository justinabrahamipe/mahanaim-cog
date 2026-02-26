'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import { ContactMethod } from '@/types';

const iconMap = {
  location: LocationOnIcon,
  phone: PhoneIcon,
  email: EmailIcon,
  whatsapp: WhatsAppIcon,
  facebook: FacebookIcon,
};

interface ContactCardProps {
  contact: ContactMethod;
}

export default function ContactCard({ contact }: ContactCardProps) {
  const Icon = iconMap[contact.iconType];

  return (
    <Card
      sx={{
        height: '100%',
        transition: 'all 0.3s ease',
        border: '2px solid transparent',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'primary.main',
        },
      }}
    >
      <CardActionArea
        href={contact.actionUrl}
        target={contact.actionUrl.startsWith('http') ? '_blank' : undefined}
        rel={contact.actionUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
        sx={{ height: '100%' }}
      >
        <CardContent sx={{ textAlign: 'center', p: 3 }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              backgroundColor: `${contact.colorTheme}.main`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
              opacity: 0.9,
            }}
          >
            <Icon sx={{ fontSize: 30, color: 'white' }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
            {contact.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {contact.description}
          </Typography>
          <Typography variant="body2" color="primary.main" sx={{ fontWeight: 500 }}>
            {contact.details}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
