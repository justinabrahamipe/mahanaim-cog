import { ChurchInfo, NavItem } from '@/types';
import churchData from '../../church.json';
import { branchNavItems } from './churches';

// Edit church.json (project root) to update church details and service times.
export const churchInfo: ChurchInfo = churchData;

export const navItems: NavItem[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Messages', href: '/sermons' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  {
    label: 'Youth',
    href: '/youth',
    children: [
      { label: 'Reels', href: '/youth' },
      { label: 'Quiz App', href: 'https://www.mahanaimypequiz.com', external: true },
      { label: 'Magazine', href: '/youth/magazine' },
    ],
  },
  { label: 'Our branches', href: '/churches', overview: 'All branches', children: branchNavItems },
  { label: 'Leadership', href: '/leadership' },
  { label: 'Contact', href: '/contact' },
];
