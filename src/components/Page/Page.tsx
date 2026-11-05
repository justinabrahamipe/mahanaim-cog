'use client';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollThread from './Components/ScrollThread';

interface PageProps {
  children: React.ReactNode;
  snap?: boolean;
  transparentHeader?: boolean;
}

export default function Page({ children, snap, transparentHeader }: PageProps) {
  useEffect(() => {
    // Honour deep links such as /churches#bangor; otherwise start at the top.
    const target = window.location.hash && document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (target) {
      target.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
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
          position: 'relative',
          ...(snap && {
            '& > *': {
              scrollSnapAlign: 'start',
            },
          }),
        }}
      >
        {!snap && <ScrollThread />}
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
