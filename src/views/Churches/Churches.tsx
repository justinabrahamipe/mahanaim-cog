'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import Page from '@/components/Page/Page';
import PageBanner from '@/components/Page/Components/PageBanner';
import PageTitle from '@/components/Page/Components/PageTitle';
import { panelSx } from '@/theme/motif';
import { ink, accent } from '@/theme/tokens';
import { churches } from '@/config/churches';

function PersonCard({
  name,
  role,
  highlight,
  phone,
  whatsapp,
  facebook,
  instagram,
  website,
}: {
  name: string;
  role: string;
  highlight?: boolean;
  phone?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
}) {
  return (
    <Card
      sx={{
        ...panelSx,
        width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 18px)' },
        textAlign: 'center',
        backgroundColor: 'background.paper',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Avatar sx={{ width: 76, height: 76, mx: 'auto', mb: 2, backgroundColor: highlight ? accent : ink }}>
          <PersonIcon sx={{ fontSize: 38, color: highlight ? ink : '#F3EEE6' }} />
        </Avatar>
        <Typography sx={{ fontWeight: 700, fontSize: '1.05rem' }}>{name}</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
          {role}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, flexWrap: 'wrap' }}>
          {phone && (
            <IconButton href={`tel:${phone}`} size="small" sx={{ color: 'text.secondary', '&:hover': { color: accent } }}>
              <PhoneIcon fontSize="small" />
            </IconButton>
          )}
          {whatsapp && (
            <IconButton
              href={`https://wa.me/${whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{ color: 'text.secondary', '&:hover': { color: accent } }}
            >
              <WhatsAppIcon fontSize="small" />
            </IconButton>
          )}
          {facebook && (
            <IconButton href={facebook} target="_blank" rel="noopener noreferrer" size="small" sx={{ color: 'text.secondary', '&:hover': { color: accent } }}>
              <FacebookIcon fontSize="small" />
            </IconButton>
          )}
          {instagram && (
            <IconButton href={instagram} target="_blank" rel="noopener noreferrer" size="small" sx={{ color: 'text.secondary', '&:hover': { color: accent } }}>
              <InstagramIcon fontSize="small" />
            </IconButton>
          )}
          {website && (
            <IconButton href={website} target="_blank" rel="noopener noreferrer" size="small" sx={{ color: 'text.secondary', '&:hover': { color: accent } }}>
              <LanguageIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function Churches() {
  const motherChurch = churches.find((c) => c.isMotherChurch);
  const sisterChurches = churches.filter((c) => !c.isMotherChurch);

  return (
    <Page>
      <PageBanner>
        <PageTitle title="Our Churches" subtitle="United in faith across the UK" />
      </PageBanner>

      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          {motherChurch && (
            <Box sx={{ mb: 8 }}>
              <Typography variant="h5" sx={{ fontSize: '1.3rem', mb: 4 }}>
                Mother Church
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                <PersonCard name={motherChurch.pastor} role="Senior Pastor" highlight phone={motherChurch.pastorPhone} whatsapp={motherChurch.pastorWhatsapp} />
                {motherChurch.associatePastors?.map((pastor) => (
                  <PersonCard key={pastor.name} name={pastor.name} role="Associate Pastor" phone={pastor.phone} whatsapp={pastor.whatsapp} />
                ))}
              </Box>
            </Box>
          )}

          <Typography variant="h5" sx={{ fontSize: '1.3rem', mb: 4 }}>
            Sister Churches
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {sisterChurches.map((church) => (
              <PersonCard
                key={church.location}
                name={church.location}
                role={church.pastor || ''}
                phone={church.contact?.phone}
                whatsapp={church.contact?.whatsapp}
                facebook={church.contact?.facebook}
                instagram={church.contact?.instagram}
                website={church.contact?.website}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </Page>
  );
}
