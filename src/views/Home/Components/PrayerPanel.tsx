'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import { churchInfo } from '@/config/church';
import { contactMethods } from '@/config/contacts';
import { Eyebrow } from '@/components/Page/Components/SectionHeading';
import { wineGlowBg, gold, goldHover, ink, creamText, onWineMuted, wineShadow } from '@/theme/tokens';

export default function PrayerPanel() {
  const whatsapp = contactMethods.find((m) => m.iconType === 'whatsapp');
  const actions = [
    { Icon: EditOutlinedIcon, title: 'Send a prayer request', detail: 'Use the contact form', href: '/contact', primary: true },
    { Icon: PhoneOutlinedIcon, title: 'Call the church', detail: churchInfo.phone, href: `tel:${churchInfo.phone.replace(/\s/g, '')}` },
    ...(whatsapp
      ? [{ Icon: ChatBubbleOutlineIcon, title: 'Message us on WhatsApp', detail: whatsapp.details, href: whatsapp.actionUrl, external: true }]
      : []),
  ];

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            background: wineGlowBg,
            color: creamText,
            borderRadius: { xs: '24px', md: '32px' },
            p: { xs: 3.5, sm: 5, md: 7 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.1fr 1fr' },
            gap: { xs: 5, md: 7 },
            alignItems: 'center',
            boxShadow: wineShadow,
          }}
        >
          <Box>
            <Eyebrow onDark>Prayer</Eyebrow>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.3rem', md: '3.2rem' }, mb: 2.5 }}>
              We&rsquo;re here to pray for you
            </Typography>
            <Typography sx={{ color: onWineMuted, lineHeight: 1.7, fontSize: '1.02rem', mb: 3.5, maxWidth: 460 }}>
              Share what is on your heart. Our church family prays for one another, and no need is too big or too
              small. Requests are kept confidential.
            </Typography>
            <Typography sx={{ fontSize: '1.15rem', lineHeight: 1.55, maxWidth: 440 }}>
              &ldquo;The prayer of a righteous person is powerful and effective.&rdquo;{' '}
              <Box component="span" sx={{ color: gold, fontSize: '0.92rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                James 5:16
              </Box>
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {actions.map(({ Icon, title, detail, href, primary, external }) => (
              <Box
                key={title}
                component={external || href.startsWith('tel:') ? 'a' : Link}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  borderRadius: '18px',
                  textDecoration: 'none',
                  color: primary ? ink : creamText,
                  backgroundColor: primary ? gold : 'rgba(251, 244, 239, 0.04)',
                  border: '1px solid',
                  borderColor: primary ? gold : 'rgba(251, 244, 239, 0.14)',
                  transition: 'background-color 180ms ease, border-color 180ms ease',
                  '& .arrow': { transition: 'transform 180ms ease' },
                  '&:hover': {
                    backgroundColor: primary ? goldHover : 'rgba(251, 244, 239, 0.09)',
                    borderColor: primary ? goldHover : 'rgba(251, 244, 239, 0.3)',
                    '& .arrow': { transform: 'translateX(3px)' },
                  },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    flexShrink: 0,
                    display: 'grid',
                    placeItems: 'center',
                    backgroundColor: primary ? 'rgba(75, 30, 38, 0.1)' : 'rgba(251, 244, 239, 0.08)',
                    color: primary ? ink : gold,
                  }}
                >
                  <Icon fontSize="small" />
                </Box>
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>{title}</Typography>
                  <Typography sx={{ fontSize: '0.85rem', opacity: 0.75 }}>{detail}</Typography>
                </Box>
                <ArrowForwardIcon className="arrow" fontSize="small" />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
