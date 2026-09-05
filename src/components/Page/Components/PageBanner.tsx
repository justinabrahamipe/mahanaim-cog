'use client';
import Box from '@mui/material/Box';
import { ink } from '@/theme/tokens';

interface PageBannerProps {
  children: React.ReactNode;
}

export default function PageBanner({ children }: PageBannerProps) {
  return (
    <Box
      sx={{
        backgroundColor: ink,
        color: '#F3EEE6',
        py: { xs: 6, md: 7 },
      }}
    >
      {children}
    </Box>
  );
}
