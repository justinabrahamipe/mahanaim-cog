import { NavItem, SisterChurch } from '@/types';
import churchesData from '../../churches.json';

// Edit churches.json (project root) to update sister church details.
export const churches: SisterChurch[] = churchesData;

// Anchor id for a branch card on /churches, e.g. "Bangor, North Wales" -> "bangor".
export const churchSlug = (location: string) =>
  location.split(',')[0].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');

export const branchNavItems: NavItem[] = churches
  .filter((c) => !c.isMotherChurch)
  .map((c) => ({ label: c.location.split(',')[0].trim(), href: `/churches#${churchSlug(c.location)}` }));
