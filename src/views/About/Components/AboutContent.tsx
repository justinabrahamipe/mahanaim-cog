'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HistoryIcon from '@mui/icons-material/History';
import { panelSx } from '@/theme/motif';
import { accent } from '@/theme/tokens';

const sections = [
  {
    icon: <VisibilityIcon sx={{ fontSize: 32 }} />,
    title: 'Our Vision',
    content:
      'To be a beacon of hope and light in Manchester, drawing people closer to God through authentic worship, genuine fellowship, and faithful service to our community.',
  },
  {
    icon: <TrackChangesIcon sx={{ fontSize: 32 }} />,
    title: 'Our Mission',
    content:
      'To share the love of Jesus Christ with all people, nurture spiritual growth through biblical teaching, and create a welcoming community where everyone can experience the transforming power of God.',
  },
];

const values = [
  {
    title: 'Faith',
    description:
      'We believe in the power of faith and trust in God to guide our lives. Our faith is the foundation upon which we build our community and our relationship with the Lord.',
  },
  {
    title: 'Community',
    description:
      'We are a welcoming family that supports and cares for one another. We believe that true fellowship strengthens our faith and brings us closer together.',
  },
  {
    title: 'Scripture',
    description:
      'We are grounded in the Word of God and committed to biblical teachings. The Bible is our guide for faith and practice in every area of life.',
  },
];

export default function AboutContent() {
  return (
    <Box sx={{ py: { xs: 8, md: 10 }, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography
          sx={{
            color: 'text.secondary',
            mb: 8,
            maxWidth: 760,
            fontSize: '1.15rem',
            lineHeight: 1.85,
          }}
        >
          Mahanaim Church of God is a vibrant Protestant community of believers dedicated to worship,
          fellowship, and serving our community in Manchester. Under the pastoral leadership of
          Pastor Biju Cherian, we welcome everyone to join us in experiencing the love and grace of
          God. Our church is a place where people from all walks of life come together to worship,
          grow, and serve.
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 4, mb: 9 }}>
          {sections.map((section) => (
            <Box key={section.title} sx={{ ...panelSx, p: 4, backgroundColor: 'background.paper' }}>
              <Box sx={{ color: accent, mb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {section.icon}
                <Typography variant="h5" sx={{ fontSize: '1.3rem' }}>
                  {section.title}
                </Typography>
              </Box>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>{section.content}</Typography>
            </Box>
          ))}
        </Box>

        <Typography variant="h4" sx={{ fontSize: { xs: '1.6rem', md: '1.9rem' }, mb: 4 }}>
          What we hold to
        </Typography>
        <Box sx={{ borderTop: '1.5px solid', borderColor: 'divider', mb: 9 }}>
          {values.map((value) => (
            <Box
              key={value.title}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '180px 1fr' },
                gap: { xs: 1, sm: 4 },
                py: 3,
                borderBottom: '1.5px solid',
                borderColor: 'divider',
              }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: '1.15rem' }}>{value.title}</Typography>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.7, maxWidth: 620 }}>
                {value.description}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ ...panelSx, p: { xs: 3, md: 5 }, mb: 4, backgroundColor: 'background.paper' }}>
          <Box sx={{ color: accent, mb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <AutoStoriesIcon sx={{ fontSize: 32 }} />
            <Typography variant="h5" sx={{ fontSize: '1.3rem' }}>
              Statement of Faith
            </Typography>
          </Box>
          <Typography sx={{ color: 'text.secondary', lineHeight: 1.85 }}>
            We believe in the Holy Bible as the inspired Word of God, the Trinity of Father, Son,
            and Holy Spirit, the deity and humanity of Jesus Christ, salvation by grace through
            faith, the resurrection of the dead, and the second coming of Christ. We are committed
            to living out our faith through worship, discipleship, fellowship, ministry, and
            evangelism.
          </Typography>
        </Box>

        <Box sx={{ ...panelSx, p: { xs: 3, md: 5 }, backgroundColor: 'background.paper' }}>
          <Box sx={{ color: accent, mb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <HistoryIcon sx={{ fontSize: 32 }} />
            <Typography variant="h5" sx={{ fontSize: '1.3rem' }}>
              Our History
            </Typography>
          </Box>
          <Typography sx={{ color: 'text.secondary', lineHeight: 1.85 }}>
            Mahanaim Church of God Manchester was established with a vision to serve the growing
            community of believers in Manchester. What began as a small gathering of faithful
            individuals has grown into a vibrant congregation united in worship and service. Under
            the leadership of Pastor Biju Cherian, our church continues to grow and impact lives
            throughout the Manchester area.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
