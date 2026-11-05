'use client';
import Box from '@mui/material/Box';
import { creamText, wineGlowBg } from '@/theme/tokens';

interface PageBannerProps {
  children: React.ReactNode;
}

export default function PageBanner({ children }: PageBannerProps) {
  return (
    <Box
      sx={{
        background: wineGlowBg,
        color: creamText,
        pt: { xs: 7, md: 10 },
        pb: { xs: 7, md: 9 },
      }}
    >
      {children}
    </Box>
  );
}
