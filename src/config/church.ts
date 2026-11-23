import { ChurchInfo, NavItem } from '@/types';
import churchData from '../../church.json';
import { branchNavItems } from './churches';
import { features } from './features';
import { youthQuizUrl } from './youth';

// Edit church.json (project root) to update church details and service times.
export const churchInfo: ChurchInfo = churchData;

export const navItems: NavItem[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Messages', href: '/sermons' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  {
    label: 'Youth',
    // With the reels page off, the quiz app is the only youth destination.
    ...(features.youthReels ? { href: '/youth' } : { href: youthQuizUrl, external: true }),
    children: [
      ...(features.youthReels ? [{ label: 'Reels', href: '/youth' }] : []),
      { label: 'Quiz App', href: youthQuizUrl, external: true },
      ...(features.magazine ? [{ label: 'Magazine', href: '/youth/magazine' }] : []),
    ],
  },
  { label: 'Our branches', href: '/churches', overview: 'All branches', children: branchNavItems },
  { label: 'Leadership', href: '/leadership' },
  { label: 'Contact', href: '/contact' },
];
