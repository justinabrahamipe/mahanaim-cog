'use client';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';

export interface ContactDetails {
  phone?: string;
  whatsapp?: string;
  email?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  website?: string;
}

// UK numbers are stored both as "07..." and "+44 7..."; wa.me wants digits only, with country code.
const whatsappUrl = (number: string) => {
  const digits = number.replace(/\D/g, '');
  return `https://wa.me/${digits.startsWith('0') ? `44${digits.slice(1)}` : digits}`;
};

const withProtocol = (url: string) => (/^https?:\/\//.test(url) ? url : `https://${url}`);

export default function ContactLinks({ contact, label }: { contact: ContactDetails; label: string }) {
  const links = [
    contact.phone && { title: 'Call', href: `tel:${contact.phone.replace(/\s/g, '')}`, Icon: PhoneOutlinedIcon },
    contact.whatsapp && { title: 'WhatsApp', href: whatsappUrl(contact.whatsapp), Icon: WhatsAppIcon, external: true },
    contact.email && { title: 'Email', href: `mailto:${contact.email}`, Icon: MailOutlineIcon },
    contact.facebook && { title: 'Facebook', href: contact.facebook, Icon: FacebookIcon, external: true },
    contact.instagram && { title: 'Instagram', href: contact.instagram, Icon: InstagramIcon, external: true },
    contact.youtube && { title: 'YouTube', href: contact.youtube, Icon: YouTubeIcon, external: true },
    contact.website && { title: 'Website', href: withProtocol(contact.website), Icon: LanguageIcon, external: true },
  ].filter(Boolean) as { title: string; href: string; Icon: typeof PhoneOutlinedIcon; external?: boolean }[];

  if (links.length === 0) return null;

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {links.map(({ title, href, Icon, external }) => (
        <Tooltip key={title} title={title}>
          <IconButton
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            aria-label={`${title}: ${label}`}
            size="small"
            sx={{
              color: 'text.secondary',
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': { color: 'secondary.main', borderColor: 'secondary.main', backgroundColor: 'transparent' },
            }}
          >
            <Icon sx={{ fontSize: 17 }} />
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
}
