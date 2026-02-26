'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from 'next/link';
import Page from '@/components/Page/Page';

export default function NotFound() {
  return (
    <Page>
      <Box
        sx={{
          py: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '6rem', md: '8rem' },
              color: 'primary.main',
              mb: 2,
            }}
          >
            404
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            The page you are looking for does not exist or has been moved.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            href="/"
            sx={{
              fontWeight: 600,
              px: 4,
              py: 1.5,
            }}
          >
            Go Home
          </Button>
        </Container>
      </Box>
    </Page>
  );
}
