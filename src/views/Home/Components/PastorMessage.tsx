'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Image from 'next/image';
import { Eyebrow } from '@/components/Page/Components/SectionHeading';
import { tintedSectionSx } from '@/theme/motif';
import { wineShadow } from '@/theme/tokens';

export default function PastorMessage() {
  return (
    <Box component="section" sx={{ py: { xs: 9, md: 12 }, ...tintedSectionSx }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
            gap: { xs: 5, md: 9 },
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              aspectRatio: '4 / 5',
              maxWidth: { xs: 340, md: 'none' },
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: wineShadow,
            }}
          >
            <Image
              src="/leaders_photos/biju_cherian.jpg"
              alt="Pastor Biju Cherian"
              fill
              sizes="(max-width: 900px) 340px, 420px"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
          </Box>

          <Box>
            <Eyebrow>A word from our pastor</Eyebrow>
            <Typography
              component="blockquote"
              sx={{
                fontWeight: 300,
                fontSize: { xs: '1.9rem', md: '2.6rem' },
                letterSpacing: '-0.03em',
                lineHeight: 1.18,
                mb: 3.5,
              }}
            >
              &ldquo;Come as you are, and leave changed by His grace.&rdquo;
            </Typography>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '1.05rem', mb: 2, maxWidth: 560 }}>
              I am glad you are here to learn about our church. I warmly welcome you to join our worship service and
              experience the touch and power of God.
            </Typography>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '1.05rem', mb: 4 }}>
              Thank you, and God bless you.
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>Pr. Biju Cherian</Typography>
            <Typography sx={{ color: 'secondary.main', fontWeight: 500, fontSize: '0.92rem' }}>Senior Pastor</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
