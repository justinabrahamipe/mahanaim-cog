'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { gold } from '@/theme/tokens';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  action?: { label: string; href: string };
  onDark?: boolean;
}

export function Eyebrow({ children, onDark }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
      <Typography
        component="p"
        sx={{ fontWeight: 600, fontSize: '0.9rem', color: onDark ? gold : 'secondary.main' }}
      >
        {children}
      </Typography>
      <Box sx={{ width: 36, height: '1px', backgroundColor: onDark ? gold : 'secondary.main', opacity: 0.6 }} />
    </Box>
  );
}

export default function SectionHeading({ eyebrow, title, intro, action, onDark }: SectionHeadingProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', md: 'flex-end' },
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3,
        mb: { xs: 4, md: 6 },
      }}
    >
      <Box sx={{ maxWidth: 640 }}>
        {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
        <Typography variant="h2" sx={{ fontSize: { xs: '2.3rem', md: '3.25rem' } }}>
          {title}
        </Typography>
        {intro && (
          <Typography sx={{ color: 'text.secondary', mt: 1.5, fontSize: '1.05rem', lineHeight: 1.65, maxWidth: 520 }}>
            {intro}
          </Typography>
        )}
      </Box>
      {action && (
        <Button
          component={Link}
          href={action.href}
          variant="outlined"
          color="primary"
          sx={{ flexShrink: 0, borderColor: 'divider', backgroundColor: 'background.paper' }}
        >
          {action.label}
        </Button>
      )}
    </Box>
  );
}
