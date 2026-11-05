'use client';
import { createTheme } from '@mui/material/styles';
import {
  wineDeep,
  inkSurfaceDark,
  creamText,
  accentLight,
  accentDark,
  gold,
  lineDark,
  textSecondaryDark,
} from './tokens';
import { sharedThemeOptions } from './lightTheme';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: creamText,
      light: '#FFFFFF',
      dark: '#DCCBC6',
      contrastText: wineDeep,
    },
    secondary: {
      main: gold,
      light: accentLight,
      dark: accentDark,
      contrastText: wineDeep,
    },
    background: {
      default: wineDeep,
      paper: inkSurfaceDark,
    },
    divider: lineDark,
    text: {
      primary: creamText,
      secondary: textSecondaryDark,
    },
    grey: { 50: '#2E1418' },
  },
  ...sharedThemeOptions(lineDark),
});
