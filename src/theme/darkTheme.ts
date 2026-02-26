'use client';
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5BA3CF',
      light: '#8BC4E8',
      dark: '#3A7BA8',
    },
    secondary: {
      main: '#E8C96A',
      light: '#F0DC94',
      dark: '#C9A84C',
    },
    background: {
      default: '#0F1419',
      paper: '#1A2332',
    },
    text: {
      primary: '#E8E6E1',
      secondary: '#9BA4B0',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
  },
});
