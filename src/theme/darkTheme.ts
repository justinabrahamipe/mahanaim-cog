'use client';
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D4908F',
      light: '#E0ADAC',
      dark: '#A04E4E',
    },
    secondary: {
      main: '#C9A84C',
      light: '#D4B96E',
      dark: '#A08530',
    },
    background: {
      default: '#120A0A',
      paper: '#1E1414',
    },
    text: {
      primary: '#F5F0EF',
      secondary: '#C4B5B2',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
  },
});
