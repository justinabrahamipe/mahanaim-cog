'use client';
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#C46A6A',
      light: '#D4908F',
      dark: '#A04E4E',
    },
    secondary: {
      main: '#D4B96E',
      light: '#E8D08A',
      dark: '#C9A84C',
    },
    background: {
      default: '#F5F2F0',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1010',
      secondary: '#5C4A4A',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
  },
});
