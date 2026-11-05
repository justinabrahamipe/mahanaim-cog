'use client';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { onWineMuted } from '@/theme/tokens';

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <Container maxWidth="lg">
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '2.6rem', md: '4rem' },
          mb: subtitle ? 2 : 0,
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ color: onWineMuted, fontSize: { xs: '1.02rem', md: '1.15rem' }, lineHeight: 1.6, maxWidth: 580 }}>
          {subtitle}
        </Typography>
      )}
    </Container>
  );
}
