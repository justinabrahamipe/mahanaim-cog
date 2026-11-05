'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Page from '@/components/Page/Page';
import PageBanner from '@/components/Page/Components/PageBanner';
import PageTitle from '@/components/Page/Components/PageTitle';
import SectionHeading from '@/components/Page/Components/SectionHeading';
import LeaderCard, { LeaderRow } from './Components/LeaderCard';
import { leaders } from '@/config/leaders';
import { Leader } from '@/types';

const groups: { type: Leader['type']; title: string; intro: string }[] = [
  { type: 'cpc', title: 'Church and Pastoral Committee', intro: 'Guides the life and direction of the church with the pastors.' },
  { type: 'official', title: 'Office bearers', intro: 'Look after finance, Sunday School, youth, media, safeguarding and more.' },
  { type: 'cell', title: 'Cell leaders', intro: 'Lead the home prayer cells in each area.' },
];

function TextGroup({ title, intro, members }: { title: string; intro: string; members: Leader[] }) {
  if (members.length === 0) return null;

  return (
    <Box
      component="section"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
        gap: { xs: 2, md: 6 },
        py: { xs: 5, md: 7 },
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box>
        <Typography variant="h3" sx={{ fontSize: { xs: '1.8rem', md: '2.1rem' }, mb: 1 }}>
          {title}
        </Typography>
        <Typography sx={{ color: 'text.secondary', lineHeight: 1.6, maxWidth: 320 }}>{intro}</Typography>
      </Box>
      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          columnGap: 4,
          alignContent: 'start',
        }}
      >
        {members.map((leader) => (
          <LeaderRow key={`${leader.name}-${leader.designation}`} leader={leader} />
        ))}
      </Box>
    </Box>
  );
}

export default function Leadership() {
  const byType = (type: Leader['type']) => leaders.filter((l) => l.type === type);
  const pastors = byType('pastor');

  return (
    <Page>
      <PageBanner>
        <PageTitle title="Leadership" subtitle="The pastors and members who serve and care for our church family." />
      </PageBanner>

      <Box sx={{ py: { xs: 8, md: 11 }, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          {pastors.length > 0 && (
            <Box component="section" sx={{ mb: { xs: 8, md: 10 } }}>
              <SectionHeading eyebrow="Shepherding the church" title="Pastoral team" />
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)', lg: `repeat(${Math.min(pastors.length, 5)}, 1fr)` },
                  gap: { xs: 2.5, md: 3 },
                }}
              >
                {pastors.map((leader) => (
                  <LeaderCard key={leader.name} leader={leader} />
                ))}
              </Box>
            </Box>
          )}

          {groups.map((group) => (
            <TextGroup key={group.type} title={group.title} intro={group.intro} members={byType(group.type)} />
          ))}

          {leaders.length === 0 && (
            <Typography sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
              Leadership details will be added here soon.
            </Typography>
          )}
        </Container>
      </Box>
    </Page>
  );
}
