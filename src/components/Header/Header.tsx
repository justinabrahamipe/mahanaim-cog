'use client';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { navItems } from '@/config/church';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import { ink, gold, wineDeep, creamText, onWineMuted } from '@/theme/tokens';
import type { NavItem } from '@/types';

const SCROLL_THRESHOLD = 48;
// Dropdowns with more links than this lay them out in two columns.
const TWO_COLUMN_AFTER = 6;

interface HeaderProps {
  overlay?: boolean;
}

export function Wordmark({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const logo = size === 'lg' ? 52 : 40;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
      <Image src="/mahanaim-logo.png" alt="" width={logo} height={logo} style={{ objectFit: 'contain' }} />
      <Box sx={{ lineHeight: 1 }}>
        <Typography
          component="span"
          sx={{
            display: 'block',
            fontWeight: 800,
            letterSpacing: '0.16em',
            fontSize: size === 'lg' ? '1.3rem' : { xs: '0.95rem', md: '1.02rem' },
            color: creamText,
            lineHeight: 1.15,
          }}
        >
          MAHANAIM
        </Typography>
        <Typography
          component="span"
          sx={{
            display: 'block',
            fontWeight: 500,
            fontSize: size === 'lg' ? '1.1rem' : { xs: '0.85rem', md: '0.92rem' },
            color: gold,
            lineHeight: 1.2,
          }}
        >
          Church of God
        </Typography>
      </Box>
    </Box>
  );
}

const navLinkSx = (active: boolean) => ({
  position: 'relative' as const,
  px: 1.25,
  py: 1,
  fontWeight: 500,
  fontSize: '0.92rem',
  color: active ? '#FFFFFF' : onWineMuted,
  textDecoration: 'none',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  background: 'none',
  border: 'none',
  font: 'inherit',
  borderRadius: 999,
  transition: 'color 160ms ease, background-color 160ms ease',
  '&:hover': { color: '#FFFFFF' },
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 2,
    height: '2px',
    borderRadius: 2,
    backgroundColor: gold,
    transform: active ? 'scaleX(1)' : 'scaleX(0)',
    transition: 'transform 180ms ease',
  },
});

function NavDropdown({ item, active, isActive }: { item: NavItem; active: boolean; isActive: (href: string) => boolean }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const children = item.children ?? [];
  const twoColumns = children.length > TWO_COLUMN_AFTER;

  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  // A short grace period lets the pointer cross the gap between button and panel.
  const hideSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const panelLinkSx = (linkActive: boolean) => ({
    display: 'block',
    px: 1.5,
    py: 1,
    borderRadius: '10px',
    fontSize: '0.92rem',
    fontWeight: 500,
    whiteSpace: 'nowrap' as const,
    textDecoration: 'none',
    color: linkActive ? gold : creamText,
    transition: 'background-color 140ms ease, color 140ms ease',
    '&:hover, &:focus-visible': { backgroundColor: 'rgba(251, 244, 239, 0.08)', color: '#FFFFFF' },
  });

  return (
    <Box
      sx={{ position: 'relative' }}
      onMouseEnter={show}
      onMouseLeave={hideSoon}
      onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Box
        component="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        sx={{ ...navLinkSx(active), backgroundColor: open ? 'rgba(251, 244, 239, 0.1)' : 'transparent', color: open ? '#FFFFFF' : navLinkSx(active).color }}
      >
        {item.label}
        <KeyboardArrowDownIcon
          sx={{ fontSize: 16, ml: 0.25, transition: 'transform 180ms ease', transform: open ? 'rotate(180deg)' : 'none' }}
        />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          pt: 1.25,
          zIndex: 10,
          visibility: open ? 'visible' : 'hidden',
          opacity: open ? 1 : 0,
          transform: open ? 'translate(-50%, 0)' : 'translate(-50%, -6px)',
          transition: 'opacity 160ms ease, transform 160ms ease, visibility 160ms',
        }}
      >
        <Box
          sx={{
            minWidth: twoColumns ? 320 : 200,
            p: 1.25,
            borderRadius: '18px',
            backgroundColor: 'rgba(42, 17, 21, 0.94)',
            backdropFilter: 'blur(16px) saturate(140%)',
            WebkitBackdropFilter: 'blur(16px) saturate(140%)',
            border: '1px solid rgba(251, 244, 239, 0.12)',
            boxShadow: '0 28px 60px -24px rgba(42, 17, 21, 0.8)',
          }}
        >
          {item.overview && (
            <Box
              component={Link}
              href={item.href}
              onClick={() => setOpen(false)}
              sx={{
                ...panelLinkSx(false),
                color: gold,
                fontWeight: 600,
                fontSize: '0.88rem',
                mb: 0.75,
                pb: 1.25,
                borderBottom: '1px solid rgba(251, 244, 239, 0.12)',
                borderRadius: '10px 10px 0 0',
              }}
            >
              {item.overview}
            </Box>
          )}
          <Box sx={{ display: 'grid', gridTemplateColumns: twoColumns ? '1fr 1fr' : '1fr', columnGap: 0.5 }}>
            {children.map((child) => (
              <Box
                key={child.label}
                component={child.external ? 'a' : Link}
                href={child.href}
                target={child.external ? '_blank' : undefined}
                rel={child.external ? 'noopener noreferrer' : undefined}
                onClick={() => setOpen(false)}
                sx={panelLinkSx(!child.external && isActive(child.href))}
              >
                {child.label}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function Header({ overlay }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = !overlay || scrolled;

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  // Hash links (a branch on /churches) never count as the active page.
  const isActive = (href: string) => {
    if (href.includes('#')) return false;
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const drawerLinkSx = (active: boolean) => ({
    fontWeight: active ? 600 : 400,
    fontSize: '1.05rem',
    color: active ? gold : creamText,
  });

  const drawer = (
    <Box sx={{ background: `linear-gradient(170deg, ${ink} 0%, ${wineDeep} 100%)`, minHeight: '100%', color: creamText }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2.5, py: 2.25 }}>
        <Box component={Link} href="/" onClick={handleDrawerToggle} sx={{ textDecoration: 'none' }}>
          <Wordmark />
        </Box>
        <IconButton aria-label="Close menu" onClick={handleDrawerToggle} sx={{ color: creamText }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ px: 1, py: 1 }}>
        {navItems.map((item) =>
          item.children ? (
            <Box key={item.label}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => toggleSubmenu(item.label)} sx={{ borderRadius: 3, px: 2, py: 1.25 }}>
                  <ListItemText primary={item.label} slotProps={{ primary: { sx: drawerLinkSx(isActive(item.href)) } }} />
                  {openSubmenu === item.label ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                </ListItemButton>
              </ListItem>
              <Collapse in={openSubmenu === item.label} timeout="auto" unmountOnExit>
                {item.overview && (
                  <ListItemButton component={Link} href={item.href} onClick={handleDrawerToggle} sx={{ borderRadius: 3, pl: 4, py: 1 }}>
                    <ListItemText primary={item.overview} slotProps={{ primary: { sx: { fontSize: '0.95rem', fontWeight: 600, color: gold } } }} />
                  </ListItemButton>
                )}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: (item.children?.length ?? 0) > TWO_COLUMN_AFTER ? '1fr 1fr' : '1fr',
                    pl: 2,
                  }}
                >
                  {item.children.map((child) => {
                    const active = !child.external && isActive(child.href);
                    return (
                      <ListItemButton
                        key={child.label}
                        component={child.external ? 'a' : Link}
                        href={child.href}
                        target={child.external ? '_blank' : undefined}
                        rel={child.external ? 'noopener noreferrer' : undefined}
                        onClick={handleDrawerToggle}
                        sx={{ borderRadius: 3, px: 2, py: 1 }}
                      >
                        <ListItemText
                          primary={child.label}
                          slotProps={{ primary: { sx: { fontSize: '0.95rem', color: active ? gold : onWineMuted } } }}
                        />
                      </ListItemButton>
                    );
                  })}
                </Box>
              </Collapse>
            </Box>
          ) : (
            <ListItem key={item.label} disablePadding>
              <ListItemButton component={Link} href={item.href} onClick={handleDrawerToggle} sx={{ borderRadius: 3, px: 2, py: 1.25 }}>
                <ListItemText primary={item.label} slotProps={{ primary: { sx: drawerLinkSx(isActive(item.href)) } }} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Box sx={{ px: 3, pt: 2, pb: 4 }}>
        <Button component={Link} href="/#visit" onClick={handleDrawerToggle} variant="contained" color="secondary" size="large" fullWidth>
          Plan a visit
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position={overlay ? 'fixed' : 'sticky'}
        sx={{
          backgroundColor: solid ? 'rgba(75, 30, 38, 0.88)' : 'transparent',
          backgroundImage: solid ? 'none' : 'linear-gradient(to bottom, rgba(42, 17, 21, 0.55), transparent)',
          backdropFilter: solid ? 'blur(14px) saturate(140%)' : 'none',
          WebkitBackdropFilter: solid ? 'blur(14px) saturate(140%)' : 'none',
          boxShadow: solid ? '0 10px 30px -18px rgba(42, 17, 21, 0.6)' : 'none',
          transition: 'background-color 240ms ease, box-shadow 240ms ease',
        }}
      >
        <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2, md: 3 } }}>
          <Toolbar disableGutters sx={{ gap: 2, minHeight: { xs: 64, md: solid ? 68 : 84 }, transition: 'min-height 240ms ease' }}>
            <Box component={Link} href="/" aria-label="Mahanaim Church of God, home" sx={{ textDecoration: 'none', flexShrink: 0 }}>
              <Wordmark />
            </Box>

            <Box
              component="nav"
              aria-label="Main"
              sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', justifyContent: 'center', flexGrow: 1, gap: 0.25 }}
            >
              {navItems.map((item) => {
                const active = isActive(item.href);
                return item.children ? (
                  <NavDropdown key={item.label} item={item} active={active} isActive={isActive} />
                ) : (
                  <Box key={item.label} component={Link} href={item.href} aria-current={active ? 'page' : undefined} sx={navLinkSx(active)}>
                    {item.label}
                  </Box>
                );
              })}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
              <ThemeToggle />
              <Button
                component={Link}
                href="/#visit"
                variant="contained"
                color="secondary"
                sx={{ display: { xs: 'none', sm: 'inline-flex' }, boxShadow: '0 8px 22px -10px rgba(242, 183, 5, 0.8)' }}
              >
                Plan a visit
              </Button>
              <IconButton
                aria-label="Open menu"
                onClick={handleDrawerToggle}
                sx={{ display: { xs: 'inline-flex', lg: 'none' }, color: creamText }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', lg: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 300, maxWidth: '86vw', border: 'none' } }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
