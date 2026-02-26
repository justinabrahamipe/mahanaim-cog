'use client';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 700,
          fontSize: { xs: '2rem', md: '3rem' },
          mb: subtitle ? 2 : 0,
          background: 'linear-gradient(to right, #ffffff, #FFD700)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="h6"
          sx={{
            opacity: 0.9,
            fontWeight: 400,
            fontSize: { xs: '1rem', md: '1.2rem' },
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Container>
  );
}
