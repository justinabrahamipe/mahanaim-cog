'use client';
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1B4965',
      light: '#4A7A9B',
      dark: '#0D2B3E',
    },
    secondary: {
      main: '#C9A84C',
      light: '#E0C97A',
      dark: '#A08530',
    },
    background: {
      default: '#F5F3EF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A2E',
      secondary: '#5C5C6F',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
  },
});
