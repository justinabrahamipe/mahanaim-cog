import { SxProps, Theme } from '@mui/material/styles';
import { wineShadow } from './tokens';

// Soft rounded panel that settles a wine shadow under itself on hover/focus.
export const panelSx: SxProps<Theme> = {
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: '20px',
  boxShadow: 'none',
  backgroundImage: 'none',
  transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
  '&:hover, &:focus-within': {
    transform: 'translateY(-3px)',
    boxShadow: wineShadow,
  },
};

export const panelStaticSx: SxProps<Theme> = {
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: '20px',
  boxShadow: wineShadow,
  backgroundImage: 'none',
};

// Alternating blush section background.
export const tintedSectionSx: SxProps<Theme> = {
  backgroundColor: (theme: Theme) => theme.palette.grey[50],
};
