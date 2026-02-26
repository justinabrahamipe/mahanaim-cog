'use client';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

interface PageProps {
  children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
