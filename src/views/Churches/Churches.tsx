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
import { churches } from '@/config/churches';

export default function Churches() {
  const motherChurch = churches.find((c) => c.isMotherChurch);
  const sisterChurches = churches.filter((c) => !c.isMotherChurch);

  return (
    <Page>
      <PageBanner>
        <PageTitle title="Our Churches" subtitle="United in faith across the UK" />
      </PageBanner>

      <Box sx={{ py: 6, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          {motherChurch && (
            <Box sx={{ mb: 8 }}>
              <Typography
                variant="h5"
                align="center"
                sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}
              >
                Mother Church
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: 3,
                }}
              >
                {/* Senior Pastor */}
                <Card
                  sx={{
                    width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 18px)' },
                    textAlign: 'center',
                    border: '2px solid',
                    borderColor: 'secondary.main',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: (theme) =>
                        theme.palette.mode === 'light'
                          ? '0 12px 24px rgba(27, 73, 101, 0.15)'
                          : '0 12px 24px rgba(91, 163, 207, 0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        backgroundColor: 'secondary.main',
                      }}
                    >
                      <PersonIcon sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5 }}>
                      {motherChurch.pastor}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                      Senior Pastor
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                      {motherChurch.pastorPhone && (
                        <IconButton href={`tel:${motherChurch.pastorPhone}`} size="small" sx={{ color: '#0088cc' }}>
                          <PhoneIcon fontSize="small" />
                        </IconButton>
                      )}
                      {motherChurch.pastorWhatsapp && (
                        <IconButton href={`https://wa.me/${motherChurch.pastorWhatsapp.replace('+', '')}`} target="_blank" rel="noopener noreferrer" size="small" sx={{ color: '#25D366' }}>
                          <WhatsAppIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </CardContent>
                </Card>
                {/* Associate Pastors */}
                {motherChurch.associatePastors?.map((pastor) => (
                  <Card
                    key={pastor.name}
                    sx={{
                      width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 18px)' },
                      textAlign: 'center',
                      border: '2px solid transparent',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        borderColor: 'primary.main',
                        boxShadow: (theme) =>
                          theme.palette.mode === 'light'
                            ? '0 12px 24px rgba(27, 73, 101, 0.12)'
                            : '0 12px 24px rgba(91, 163, 207, 0.12)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Avatar
                        sx={{
                          width: 80,
                          height: 80,
                          mx: 'auto',
                          mb: 2,
                          backgroundColor: 'primary.main',
                        }}
                      >
                        <PersonIcon sx={{ fontSize: 40 }} />
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5 }}>
                        {pastor.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                        Associate Pastor
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                        {pastor.phone && (
                          <IconButton href={`tel:${pastor.phone}`} size="small" sx={{ color: '#0088cc' }}>
                            <PhoneIcon fontSize="small" />
                          </IconButton>
                        )}
                        {pastor.whatsapp && (
                          <IconButton href={`https://wa.me/${pastor.whatsapp.replace('+', '')}`} target="_blank" rel="noopener noreferrer" size="small" sx={{ color: '#25D366' }}>
                            <WhatsAppIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          )}

          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}
          >
            Sister Churches
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 3,
            }}
          >
            {sisterChurches.map((church) => (
              <Card
                key={church.location}
                sx={{
                  width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 18px)' },
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  border: '2px solid transparent',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: 'primary.main',
                    boxShadow: (theme) =>
                      theme.palette.mode === 'light'
                        ? '0 12px 24px rgba(27, 73, 101, 0.12)'
                        : '0 12px 24px rgba(91, 163, 207, 0.12)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                      backgroundColor: 'primary.main',
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5 }}>
                    {church.location}
                  </Typography>
                  {church.pastor && (
                    <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500, mb: 1.5 }}>
                      {church.pastor}
                    </Typography>
                  )}
                  {church.contact && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, flexWrap: 'wrap' }}>
                      {church.contact.phone && (
                        <IconButton href={`tel:${church.contact.phone}`} size="small" sx={{ color: '#0088cc' }}>
                          <PhoneIcon fontSize="small" />
                        </IconButton>
                      )}
                      {church.contact.whatsapp && (
                        <IconButton href={`https://wa.me/${church.contact.whatsapp.replace('+', '')}`} target="_blank" rel="noopener noreferrer" size="small" sx={{ color: '#25D366' }}>
                          <WhatsAppIcon fontSize="small" />
                        </IconButton>
                      )}
                      {church.contact.facebook && (
                        <IconButton href={church.contact.facebook} target="_blank" rel="noopener noreferrer" size="small" sx={{ color: '#1877F2' }}>
                          <FacebookIcon fontSize="small" />
                        </IconButton>
                      )}
                      {church.contact.instagram && (
                        <IconButton href={church.contact.instagram} target="_blank" rel="noopener noreferrer" size="small" sx={{ color: '#E4405F' }}>
                          <InstagramIcon fontSize="small" />
                        </IconButton>
                      )}
                      {church.contact.website && (
                        <IconButton href={church.contact.website} target="_blank" rel="noopener noreferrer" size="small" sx={{ color: '#FF6D00' }}>
                          <LanguageIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </Page>
  );
}
