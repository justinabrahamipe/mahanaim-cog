import { NavItem, SisterChurch } from '@/types';
import churchesData from '../../churches.json';

// Edit churches.json (project root) to update sister church details.
export const churches: SisterChurch[] = churchesData;

// Anchor id for a branch card on /churches, e.g. "Bangor, North Wales" -> "bangor".
export const churchSlug = (location: string) =>
  location.split(',')[0].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');

// Branches with a town photo at public/branch_photos/<slug>.jpg. Add a slug here
// after adding its photo; branches without one show a plain panel instead.
const BRANCH_PHOTOS = new Set([
  'telford', 'keighley', 'burnley', 'shrewsbury', 'ludlow', 'preston',
  'bolton', 'crewe', 'bradford', 'warrington', 'dolgellau', 'bangor',
  // Wikimedia Commons, CC BY-SA; credited in public/branch_photos/CREDITS.md.
  'liverpool', 'lancashire',
]);

// Licence attribution for photos that are not the church's own, shown on the card.
export const branchPhotoCredits: Record<string, { text: string; href: string }> = {
  liverpool: {
    text: 'Photo: Graham Robson, CC BY-SA 2.0',
    href: 'https://commons.wikimedia.org/wiki/File:%22The_Three_Graces%22,_Liverpool_Pier_Head_-_geograph.org.uk_-_4866613.jpg',
  },
  lancashire: {
    text: 'Photo: Dominic Nelson, CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:Pendle_Hill_-_view_from_Weets_Hill_-_Feb_2025.jpg',
  },
};

export const branchPhoto = (location: string) => {
  const slug = churchSlug(location);
  return BRANCH_PHOTOS.has(slug) ? `/branch_photos/${slug}.jpg` : undefined;
};

export const branchNavItems: NavItem[] = churches
  .filter((c) => !c.isMotherChurch)
  .map((c) => ({ label: c.location.split(',')[0].trim(), href: `/churches#${churchSlug(c.location)}` }));
