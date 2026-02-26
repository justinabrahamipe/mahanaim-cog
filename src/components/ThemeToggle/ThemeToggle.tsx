'use client';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '@/theme/ThemeContext';

export default function ThemeToggle() {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <IconButton
      sx={{
        ml: 1,
        color: 'secondary.main',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
      }}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
