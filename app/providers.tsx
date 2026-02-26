'use client';
import ThemeContextProvider from '@/theme/ThemeContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
}
