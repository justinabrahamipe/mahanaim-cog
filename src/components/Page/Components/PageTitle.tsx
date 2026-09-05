'use client';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { accent } from '@/theme/tokens';

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Box
          sx={{
            width: 10,
            height: 10,
            mt: { xs: '10px', md: '18px' },
            flexShrink: 0,
            backgroundColor: accent,
          }}
        />
        <Box>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.75rem' },
              lineHeight: 1.1,
              mb: subtitle ? 1.5 : 0,
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" sx={{ color: 'rgba(243,238,230,0.72)', fontSize: { xs: '1rem', md: '1.1rem' }, maxWidth: 560 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}
