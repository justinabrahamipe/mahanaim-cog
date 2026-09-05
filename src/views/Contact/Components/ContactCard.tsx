'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import { panelSx } from '@/theme/motif';
import { accent } from '@/theme/tokens';
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
    <Box sx={{ ...panelSx, height: '100%', backgroundColor: 'background.paper' }}>
      <CardActionArea
        href={contact.actionUrl}
        target={contact.actionUrl.startsWith('http') ? '_blank' : undefined}
        rel={contact.actionUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
        sx={{ height: '100%', p: 3 }}
      >
        <Icon sx={{ fontSize: 30, color: accent, mb: 1.5 }} />
        <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', mb: 0.5 }}>{contact.title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {contact.description}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {contact.details}
        </Typography>
      </CardActionArea>
    </Box>
  );
}
