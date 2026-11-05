'use client';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import {
  ink,
  textInk,
  cream,
  blush,
  paperLight,
  gold,
  goldHover,
  accent,
  accentDark,
  accentLight,
  lineLight,
  textSecondaryLight,
  displayFontStack,
  bodyFontStack,
} from './tokens';

// Light, airy headings with tight tracking carry the voice of the site.
const heading = {
  fontFamily: displayFontStack,
  fontWeight: 300,
  letterSpacing: '-0.03em',
  lineHeight: 1.08,
  textWrap: 'balance',
} as const;

export const sharedThemeOptions = (line: string): ThemeOptions => ({
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: bodyFontStack,
    h1: heading,
    h2: heading,
    h3: heading,
    h4: { ...heading, fontWeight: 400, letterSpacing: '-0.02em' },
    h5: { fontFamily: displayFontStack, fontWeight: 600, letterSpacing: '-0.01em' },
    h6: { fontFamily: displayFontStack, fontWeight: 600, letterSpacing: '-0.01em' },
    button: { fontFamily: bodyFontStack, textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, paddingLeft: 22, paddingRight: 22 },
        sizeLarge: { paddingTop: 11, paddingBottom: 11 },
        outlined: { borderWidth: '1.5px', '&:hover': { borderWidth: '1.5px' } },
        containedSecondary: {
          backgroundColor: gold,
          color: ink,
          '&:hover': { backgroundColor: goldHover },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: `1px solid ${line}`,
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
      styleOverrides: { root: { borderRadius: 999, fontWeight: 600 } },
    },
    MuiOutlinedInput: {
      styleOverrides: { root: { borderRadius: 12 } },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: ink,
      light: '#7A3440',
      dark: '#2A1115',
      contrastText: '#FFFFFF',
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
      primary: textInk,
      secondary: textSecondaryLight,
    },
    // grey[50] is the alternating section tint (see tintedSectionSx).
    grey: { 50: blush },
  },
  ...sharedThemeOptions(lineLight),
});
