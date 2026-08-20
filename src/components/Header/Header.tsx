'use client';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
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
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navItems } from '@/config/church';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import type { NavItem } from '@/types';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuItem, setMenuItem] = useState<NavItem | null>(null);
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2, gap: 1 }}>
        <Image
          src="/mahanaim-logo.png"
          alt="Mahanaim COG Logo"
          width={40}
          height={40}
          style={{ objectFit: 'contain' }}
        />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Mahanaim Church of God
        </Typography>
      </Box>
      <List>
        {navItems.map((item) =>
          item.children ? (
            <Box key={item.label}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSubmenu(item.label);
                  }}
                  sx={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    backgroundColor: isActive(item.href) ? 'action.selected' : 'transparent',
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: isActive(item.href) ? 700 : 400,
                      color: isActive(item.href) ? 'primary.main' : 'text.primary',
                    }}
                  />
                  {openSubmenu === item.label ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
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
                        sx={{
                          textAlign: 'center',
                          pl: 4,
                          backgroundColor: !child.external && isActive(child.href) ? 'action.selected' : 'transparent',
                        }}
                      >
                        <ListItemText
                          primary={child.label}
                          primaryTypographyProps={{
                            fontSize: '0.9rem',
                            fontWeight: !child.external && isActive(child.href) ? 700 : 400,
                            color: !child.external && isActive(child.href) ? 'primary.main' : 'text.secondary',
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
              <ListItemButton
                component={Link}
                href={item.href}
                sx={{
                  textAlign: 'center',
                  backgroundColor: isActive(item.href) ? 'action.selected' : 'transparent',
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive(item.href) ? 700 : 400,
                    color: isActive(item.href) ? 'primary.main' : 'text.primary',
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
      <AppBar position="sticky" sx={{ backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A0505' : '#C46A6A' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component={Link}
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Image
              src="/mahanaim-logo.png"
              alt="Mahanaim COG Logo"
              width={45}
              height={45}
              style={{ objectFit: 'contain' }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                letterSpacing: '0.5px',
                display: { xs: 'none', md: 'block' },
              }}
            >
              Mahanaim Church of God
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                letterSpacing: '0.5px',
                display: { xs: 'block', md: 'none' },
              }}
            >
              Mahanaim COG
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
            {navItems.map((item) =>
              item.children ? (
                <Button
                  key={item.label}
                  onClick={(e) => handleMenuOpen(e, item)}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    color: '#fff',
                    fontWeight: isActive(item.href) ? 700 : 500,
                    borderBottom: isActive(item.href) ? '2px solid' : '2px solid transparent',
                    borderColor: isActive(item.href) ? 'secondary.main' : 'transparent',
                    borderRadius: 0,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ) : (
                <Button
                  key={item.label}
                  component={Link}
                  href={item.href}
                  sx={{
                    color: '#fff',
                    fontWeight: isActive(item.href) ? 700 : 500,
                    borderBottom: isActive(item.href) ? '2px solid' : '2px solid transparent',
                    borderColor: isActive(item.href) ? 'secondary.main' : 'transparent',
                    borderRadius: 0,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              )
            )}
          </Box>
          <ThemeToggle />
        </Toolbar>
      </AppBar>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleMenuClose}>
        {menuItem?.children?.map((child) => (
          <MenuItem
            key={child.label}
            component={child.external ? 'a' : Link}
            href={child.href}
            target={child.external ? '_blank' : undefined}
            rel={child.external ? 'noopener noreferrer' : undefined}
            onClick={handleMenuClose}
            selected={!child.external && isActive(child.href)}
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
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
