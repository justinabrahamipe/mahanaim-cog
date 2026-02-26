'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Page from '@/components/Page/Page';
import PageBanner from '@/components/Page/Components/PageBanner';
import PageTitle from '@/components/Page/Components/PageTitle';
import LeaderCard from './Components/LeaderCard';
import { leaders } from '@/config/leaders';

export default function Leadership() {
  const pastors = leaders.filter((l) => l.type === 'pastor');
  const officials = leaders.filter((l) => l.type === 'official');

  return (
    <Page>
      <PageBanner>
        <PageTitle title="Leadership" subtitle="Meet the leaders who guide our church" />
      </PageBanner>

      <Box sx={{ py: 6, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          {/* Pastors section */}
          {pastors.length > 0 && (
            <Box sx={{ mb: 8 }}>
              <Typography
                variant="h5"
                align="center"
                sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}
              >
                Main Leaders
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                  },
                  gap: 3,
                  justifyItems: pastors.length < 4 ? 'center' : 'stretch',
                }}
              >
                {pastors.map((leader) => (
                  <LeaderCard key={leader.name} leader={leader} />
                ))}
              </Box>
            </Box>
          )}

          {/* Officials section */}
          {officials.length > 0 && (
            <Box>
              <Typography
                variant="h5"
                align="center"
                sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}
              >
                Officials
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                  },
                  gap: 3,
                }}
              >
                {officials.map((leader) => (
                  <LeaderCard key={leader.name} leader={leader} />
                ))}
              </Box>
            </Box>
          )}

          {leaders.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                Leadership information coming soon.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </Page>
  );
}
