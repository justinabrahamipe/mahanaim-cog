'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HistoryIcon from '@mui/icons-material/History';

const sections = [
  {
    icon: <VisibilityIcon sx={{ fontSize: 40 }} />,
    title: 'Our Vision',
    content:
      'To be a beacon of hope and light in Manchester, drawing people closer to God through authentic worship, genuine fellowship, and faithful service to our community.',
  },
  {
    icon: <TrackChangesIcon sx={{ fontSize: 40 }} />,
    title: 'Our Mission',
    content:
      'To share the love of Jesus Christ with all people, nurture spiritual growth through biblical teaching, and create a welcoming community where everyone can experience the transforming power of God.',
  },
];

const values = [
  {
    icon: <FavoriteIcon sx={{ fontSize: 48 }} />,
    title: 'Faith',
    description:
      'We believe in the power of faith and trust in God to guide our lives. Our faith is the foundation upon which we build our community and our relationship with the Lord.',
  },
  {
    icon: <PeopleIcon sx={{ fontSize: 48 }} />,
    title: 'Community',
    description:
      'We are a welcoming family that supports and cares for one another. We believe that true fellowship strengthens our faith and brings us closer together.',
  },
  {
    icon: <MenuBookIcon sx={{ fontSize: 48 }} />,
    title: 'Scripture',
    description:
      'We are grounded in the Word of God and committed to biblical teachings. The Bible is our guide for faith and practice in every area of life.',
  },
];

export default function AboutContent() {
  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        {/* Intro */}
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{
            mb: 8,
            maxWidth: '900px',
            mx: 'auto',
            fontSize: '1.15rem',
            lineHeight: 1.9,
          }}
        >
          Mahanaim Church of God is a vibrant Protestant community of believers dedicated to worship,
          fellowship, and serving our community in Manchester. Under the pastoral leadership of
          Pastor Biju Cherian, we welcome everyone to join us in experiencing the love and grace of
          God. Our church is a place where people from all walks of life come together to worship,
          grow, and serve.
        </Typography>

        {/* Vision & Mission */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 4,
            mb: 8,
          }}
        >
          {sections.map((section) => (
            <Card
              key={section.title}
              sx={{
                p: 4,
                transition: 'all 0.3s ease',
                border: '2px solid transparent',
                '&:hover': {
                  borderColor: 'primary.main',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Box sx={{ color: 'primary.main', mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                {section.icon}
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {section.title}
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {section.content}
              </Typography>
            </Card>
          ))}
        </Box>

        {/* Values */}
        <Typography
          variant="h4"
          component="h2"
          align="center"
          sx={{ fontWeight: 700, mb: 6, color: 'primary.main' }}
        >
          Our Values
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
            mb: 8,
          }}
        >
          {values.map((value) => (
            <Card
              key={value.title}
              sx={{
                height: '100%',
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
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {value.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Statement of Faith */}
        <Card sx={{ p: 4, mb: 8, border: '2px solid transparent', '&:hover': { borderColor: 'primary.main' }, transition: 'all 0.3s ease' }}>
          <Box sx={{ color: 'primary.main', mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <AutoStoriesIcon sx={{ fontSize: 40 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
              Statement of Faith
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9, mb: 2 }}>
            We believe in the Holy Bible as the inspired Word of God, the Trinity of Father, Son,
            and Holy Spirit, the deity and humanity of Jesus Christ, salvation by grace through
            faith, the resurrection of the dead, and the second coming of Christ. We are committed
            to living out our faith through worship, discipleship, fellowship, ministry, and
            evangelism.
          </Typography>
        </Card>

        {/* History */}
        <Card sx={{ p: 4, border: '2px solid transparent', '&:hover': { borderColor: 'primary.main' }, transition: 'all 0.3s ease' }}>
          <Box sx={{ color: 'primary.main', mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <HistoryIcon sx={{ fontSize: 40 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
              Our History
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9 }}>
            Mahanaim Church of God Manchester was established with a vision to serve the growing
            community of believers in Manchester. What began as a small gathering of faithful
            individuals has grown into a vibrant congregation united in worship and service. Under
            the leadership of Pastor Biju Cherian, our church continues to grow and impact lives
            throughout the Manchester area.
          </Typography>
        </Card>
      </Container>
    </Box>
  );
}
