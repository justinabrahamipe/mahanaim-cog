'use client';
import { createTheme } from '@mui/material/styles';
import {
  ink,
  cream,
  paperLight,
  accent,
  accentDark,
  accentLight,
  lineLight,
  textSecondaryLight,
  displayFontStack,
  bodyFontStack,
} from './tokens';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: ink,
      light: '#3A302A',
      dark: '#000000',
      contrastText: cream,
    },
    secondary: {
      main: accent,
      light: accentLight,
      dark: accentDark,
      contrastText: ink,
    },
    background: {
      default: cream,
      paper: paperLight,
    },
    divider: lineLight,
    text: {
      primary: ink,
      secondary: textSecondaryLight,
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
          border: `1.5px solid ${lineLight}`,
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
