'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Page from '@/components/Page/Page';
import PageBanner from '@/components/Page/Components/PageBanner';
import PageTitle from '@/components/Page/Components/PageTitle';
import LeaderCard from './Components/LeaderCard';
import { leaders } from '@/config/leaders';
import { Leader } from '@/types';

function LeaderSection({ title, members }: { title: string; members: Leader[] }) {
  if (members.length === 0) return null;

  return (
    <Accordion
      defaultExpanded
      disableGutters
      sx={{
        border: '1.5px solid',
        borderColor: 'divider',
        borderRadius: '3px',
        boxShadow: 'none',
        backgroundImage: 'none',
        mb: 3,
        '&:before': { display: 'none' },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 1, pb: 4 }}>
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
            justifyItems: members.length < 4 ? 'center' : 'stretch',
          }}
        >
          {members.map((leader) => (
            <LeaderCard key={leader.name} leader={leader} />
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default function Leadership() {
  const pastors = leaders.filter((l) => l.type === 'pastor').sort((a, b) => a.priority - b.priority);
  const cpcMembers = leaders.filter((l) => l.type === 'cpc').sort((a, b) => a.priority - b.priority);
  const officials = leaders.filter((l) => l.type === 'official').sort((a, b) => a.priority - b.priority);
  const cellLeaders = leaders.filter((l) => l.type === 'cell').sort((a, b) => a.priority - b.priority);

  return (
    <Page>
      <PageBanner>
        <PageTitle title="Leadership" subtitle="Meet the leaders who guide our church" />
      </PageBanner>

      <Box sx={{ py: 6, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <LeaderSection title="Pastoral Team" members={pastors} />
          <LeaderSection title="Church and Pastoral Committee (CPC)" members={cpcMembers} />
          <LeaderSection title="Office Bearers" members={officials} />
          <LeaderSection title="Cell Leaders" members={cellLeaders} />

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
