'use client';
import Box from '@mui/material/Box';

interface PageBannerProps {
  children: React.ReactNode;
}

export default function PageBanner({ children }: PageBannerProps) {
  return (
    <Box
      sx={{
        background: (theme) =>
          theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, #0a0e27 0%, #1a237e 50%, #283593 100%)'
            : 'linear-gradient(135deg, #0a0e27 0%, #1a1a2e 50%, #0f1419 100%)',
        color: 'white',
        py: { xs: 6, md: 8 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(circle 600px at 20% 50%, rgba(255, 179, 0, 0.15), transparent)',
          pointerEvents: 'none',
        },
      }}
    >
      {children}
    </Box>
  );
}
