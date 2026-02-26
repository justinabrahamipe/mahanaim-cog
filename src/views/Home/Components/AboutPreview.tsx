'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Link from 'next/link';

const values = [
  {
    icon: <FavoriteIcon sx={{ fontSize: 48 }} />,
    title: 'Faith',
    description: 'We believe in the power of faith and trust in God to guide our lives.',
  },
  {
    icon: <PeopleIcon sx={{ fontSize: 48 }} />,
    title: 'Community',
    description: 'We are a welcoming family that supports and cares for one another.',
  },
  {
    icon: <MenuBookIcon sx={{ fontSize: 48 }} />,
    title: 'Scripture',
    description: 'We are grounded in the Word of God and committed to biblical teachings.',
  },
];

export default function AboutPreview() {
  return (
    <Box
      sx={{
        py: 10,
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}
        >
          About Us
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{
            mb: 4,
            maxWidth: '800px',
            mx: 'auto',
            fontSize: '1.1rem',
            lineHeight: 1.8,
          }}
        >
          Mahanaim Church of God is a vibrant Protestant community of believers dedicated to worship,
          fellowship, and serving our community. Under the pastoral leadership of Pastor Biju
          Cherian, we welcome everyone to join us in experiencing the love and grace of God.
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
            mb: 6,
          }}
        >
          {values.map((value) => (
            <Card
              key={value.title}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                p: 3,
                transition: 'all 0.3s ease',
                border: '2px solid transparent',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: (theme) =>
                    theme.palette.mode === 'light'
                      ? '0 12px 24px rgba(183, 28, 28, 0.15)'
                      : '0 12px 24px rgba(229, 115, 115, 0.15)',
                  borderColor: 'primary.main',
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    color: 'primary.main',
                    mb: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    '& svg': { fontSize: 56 },
                  }}
                >
                  {value.icon}
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}
                >
                  {value.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.7, fontSize: '0.95rem' }}
                >
                  {value.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            href="/about"
            sx={{
              fontWeight: 600,
              px: 4,
              py: 1.5,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
              },
            }}
          >
            Learn More About Us
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
