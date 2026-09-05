'use client';
import { createTheme } from '@mui/material/styles';
import {
  ink,
  inkSurfaceDark,
  creamText,
  accent,
  accentDark,
  accentLight,
  lineDark,
  textSecondaryDark,
  displayFontStack,
  bodyFontStack,
} from './tokens';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: creamText,
      light: '#FFFFFF',
      dark: '#C9BFB2',
      contrastText: ink,
    },
    secondary: {
      main: accent,
      light: accentLight,
      dark: accentDark,
      contrastText: ink,
    },
    background: {
      default: ink,
      paper: inkSurfaceDark,
    },
    divider: lineDark,
    text: {
      primary: creamText,
      secondary: textSecondaryDark,
    },
  },
  shape: { borderRadius: 3 },
  typography: {
    fontFamily: bodyFontStack,
    h1: { fontFamily: displayFontStack, fontWeight: 700 },
    h2: { fontFamily: displayFontStack, fontWeight: 700 },
    h3: { fontFamily: displayFontStack, fontWeight: 700 },
    h4: { fontFamily: displayFontStack, fontWeight: 600 },
    h5: { fontFamily: displayFontStack, fontWeight: 600 },
    h6: { fontFamily: displayFontStack, fontWeight: 600 },
    button: { fontFamily: bodyFontStack, textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 3, paddingLeft: 20, paddingRight: 20 },
        outlined: { borderWidth: '1.5px', '&:hover': { borderWidth: '1.5px' } },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          border: `1.5px solid ${lineDark}`,
          boxShadow: 'none',
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiAppBar: {
      styleOverrides: { root: { boxShadow: 'none' } },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 3, fontWeight: 600 } },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
    },
  },
});
