'use client';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

interface PageProps {
  children: React.ReactNode;
  snap?: boolean;
  transparentHeader?: boolean;
}

export default function Page({ children, snap, transparentHeader }: PageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        ...(snap && {
          height: '100vh',
          overflowY: 'auto',
          scrollSnapType: 'y mandatory',
          '& > *': {
            scrollSnapAlign: 'start',
          },
        }),
      }}
    >
      <Header overlay={transparentHeader} />
      <Box
        component="main"
        sx={{
          flex: 1,
          ...(snap && {
            '& > *': {
              scrollSnapAlign: 'start',
            },
          }),
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
