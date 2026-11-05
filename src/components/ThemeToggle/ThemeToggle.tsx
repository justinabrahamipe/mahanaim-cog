'use client';
import IconButton from '@mui/material/IconButton';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useThemeContext } from '@/theme/ThemeContext';
import { onWineMuted } from '@/theme/tokens';

export default function ThemeToggle() {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <IconButton
      sx={{
        color: onWineMuted,
        '&:hover': { color: '#FFFFFF', backgroundColor: 'rgba(255, 255, 255, 0.08)' },
      }}
      onClick={toggleTheme}
      aria-label={mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {mode === 'dark' ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
    </IconButton>
  );
}
