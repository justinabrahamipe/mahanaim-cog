'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { panelSx } from '@/theme/motif';
import { accent, ink } from '@/theme/tokens';

export default function PastorMessage() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '260px 1fr' },
            gap: { xs: 5, md: 7 },
            alignItems: 'start',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Avatar
              src="/leaders_photos/biju_cherian.jpg"
              alt="Pr. Biju Cherian"
              sx={{
                width: { xs: 140, md: 200 },
                height: { xs: 140, md: 200 },
                mx: 'auto',
                mb: 2.5,
                border: '3px solid',
                borderColor: 'text.primary',
              }}
            />
            <Typography sx={{ fontWeight: 700, fontSize: '1.15rem' }}>Pr. Biju Cherian</Typography>
            <Typography sx={{ color: accent, fontWeight: 600, fontSize: '0.9rem' }}>Senior Pastor</Typography>
          </Box>

          <Box>
            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.9rem', md: '2.3rem' }, mb: 3, color: accent }}
            >
              Greetings
            </Typography>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2, fontSize: '1.05rem' }}>
              I am glad you are here to know about our church. I wholeheartedly welcome you to attend
              our worship service and experience the touch and power of God.
            </Typography>
            <Typography sx={{ fontWeight: 600, mb: 4, fontSize: '1.05rem' }}>
              Thank you and God bless you.
            </Typography>

            <Box
              sx={{
                ...panelSx,
                borderLeft: `4px solid ${accent}`,
                borderRadius: '3px',
                p: { xs: 2.5, md: 3 },
                backgroundColor: 'background.default',
              }}
            >
              <Typography
                sx={{
                  fontStyle: 'italic',
                  fontWeight: 600,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  color: (theme) => (theme.palette.mode === 'light' ? ink : 'text.primary'),
                }}
              >
                &ldquo;Come as you are, leave changed by His grace&rdquo;
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
