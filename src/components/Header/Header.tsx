'use client';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
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
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { navItems } from '@/config/church';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import { ink, accent } from '@/theme/tokens';
import type { NavItem } from '@/types';

const NAV_TEXT = '#F3EEE6';
const SCROLL_THRESHOLD = 64;

interface HeaderProps {
  overlay?: boolean;
}

export default function Header({ overlay }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuItem, setMenuItem] = useState<NavItem | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [overlay]);

  const solid = !overlay || scrolled;

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, item: NavItem) => {
    setAnchorEl(event.currentTarget);
    setMenuItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuItem(null);
  };

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'left', backgroundColor: ink, minHeight: '100vh', color: NAV_TEXT }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 3, py: 3, borderBottom: '1px solid rgba(243,238,230,0.14)' }}>
        <Image src="/mahanaim-logo.png" alt="Mahanaim COG Logo" width={36} height={36} style={{ objectFit: 'contain' }} />
        <Typography sx={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>
          Mahanaim
        </Typography>
      </Box>
      <List sx={{ py: 1 }}>
        {navItems.map((item) =>
          item.children ? (
            <Box key={item.label}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSubmenu(item.label);
                  }}
                  sx={{ px: 3, py: 1.25 }}
                >
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        sx: {
                          fontWeight: isActive(item.href) ? 700 : 500,
                          color: isActive(item.href) ? accent : NAV_TEXT,
                        },
                      },
                    }}
                  />
                  {openSubmenu === item.label ? (
                    <ExpandLessIcon fontSize="small" sx={{ color: NAV_TEXT }} />
                  ) : (
                    <ExpandMoreIcon fontSize="small" sx={{ color: NAV_TEXT }} />
                  )}
                </ListItemButton>
              </ListItem>
              <Collapse in={openSubmenu === item.label} timeout="auto" unmountOnExit>
                <List disablePadding>
                  {item.children.map((child) => (
                    <ListItem key={child.label} disablePadding>
                      <ListItemButton
                        component={child.external ? 'a' : Link}
                        href={child.href}
                        target={child.external ? '_blank' : undefined}
                        rel={child.external ? 'noopener noreferrer' : undefined}
                        sx={{ pl: 5, py: 1 }}
                      >
                        <ListItemText
                          primary={child.label}
                          slotProps={{
                            primary: {
                              sx: {
                                fontSize: '0.9rem',
                                fontWeight: !child.external && isActive(child.href) ? 700 : 400,
                                color: !child.external && isActive(child.href) ? accent : 'rgba(243,238,230,0.75)',
                              },
                            },
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </Box>
          ) : (
            <ListItem key={item.label} disablePadding>
              <ListItemButton component={Link} href={item.href} sx={{ px: 3, py: 1.25 }}>
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontWeight: isActive(item.href) ? 700 : 500,
                        color: isActive(item.href) ? accent : NAV_TEXT,
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position={overlay ? 'fixed' : 'sticky'}
        sx={{
          backgroundColor: solid ? ink : 'transparent',
          backgroundImage: solid ? 'none' : 'linear-gradient(to bottom, rgba(20,16,14,0.6), transparent)',
          borderBottom: solid && !overlay ? '1px solid rgba(243,238,230,0.1)' : 'none',
          boxShadow: 'none',
          transition: 'background-color 200ms ease, background-image 200ms ease',
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <IconButton
            aria-label="open menu"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1, display: { sm: 'none' }, color: NAV_TEXT }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            component={Link}
            href="/"
            sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexGrow: 1, textDecoration: 'none' }}
          >
            <Image src="/mahanaim-logo.png" alt="Mahanaim COG Logo" width={38} height={38} style={{ objectFit: 'contain' }} />
            <Typography
              component="span"
              sx={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: { xs: '1.05rem', md: '1.2rem' },
                color: NAV_TEXT,
              }}
            >
              Mahanaim
              <Box component="span" sx={{ color: accent }}>
                {' '}
                Church of God
              </Box>
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            {navItems.map((item) => {
              const active = isActive(item.href);
              const commonSx = {
                position: 'relative' as const,
                px: 1.5,
                py: 0.75,
                fontWeight: active ? 700 : 500,
                fontSize: '0.95rem',
                color: NAV_TEXT,
                textDecoration: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 12,
                  right: 12,
                  bottom: 4,
                  height: '3px',
                  backgroundColor: accent,
                  transform: active ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 160ms ease',
                },
                '&:hover::after': { transform: 'scaleX(1)' },
              };

              return item.children ? (
                <Box key={item.label} component="button" onClick={(e) => handleMenuOpen(e, item)} sx={{ ...commonSx, background: 'none', border: 'none', font: 'inherit' }}>
                  {item.label}
                  <KeyboardArrowDownIcon sx={{ fontSize: 18, ml: 0.25 }} />
                </Box>
              ) : (
                <Box key={item.label} component={Link} href={item.href} sx={commonSx}>
                  {item.label}
                </Box>
              );
            })}
          </Box>

          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleMenuClose}
        slotProps={{ paper: { sx: { mt: 1, backgroundColor: ink, color: NAV_TEXT, border: '1px solid rgba(243,238,230,0.14)' } } }}
      >
        {menuItem?.children?.map((child) => (
          <MenuItem
            key={child.label}
            component={child.external ? 'a' : Link}
            href={child.href}
            target={child.external ? '_blank' : undefined}
            rel={child.external ? 'noopener noreferrer' : undefined}
            onClick={handleMenuClose}
            sx={{
              color: !child.external && isActive(child.href) ? accent : NAV_TEXT,
              fontWeight: !child.external && isActive(child.href) ? 700 : 400,
            }}
          >
            {child.label}
          </MenuItem>
        ))}
      </Menu>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 } }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
