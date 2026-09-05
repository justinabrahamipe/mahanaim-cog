import { SxProps, Theme } from '@mui/material/styles';
import { accent, accentLight } from './tokens';

// The recurring "two camps" gesture: a panel with a hard-edged accent
// twin sitting behind it, which steps out further on hover/focus — two
// shapes drawing apart rather than a card lifting on a soft shadow.
export const panelSx: SxProps<Theme> = {
  border: '1.5px solid',
  borderColor: 'divider',
  borderRadius: '3px',
  boxShadow: 'none',
  backgroundImage: 'none',
  transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
  '&:hover, &:focus-within': {
    transform: 'translate(-4px, -4px)',
    borderColor: 'text.primary',
    boxShadow: (theme) =>
      `4px 4px 0 0 ${theme.palette.mode === 'light' ? accent : accentLight}`,
  },
};

export const panelStaticSx: SxProps<Theme> = {
  border: '1.5px solid',
  borderColor: 'text.primary',
  borderRadius: '3px',
  boxShadow: (theme: Theme) => `6px 6px 0 0 ${theme.palette.mode === 'light' ? accent : accentLight}`,
  backgroundImage: 'none',
};
