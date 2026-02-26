import { PageMeta } from '@/types';

export const siteMetadata = {
  siteName: 'Mahanaim Church of God Manchester',
  siteUrl: 'https://mahanaimcog.org',
  description:
    'Mahanaim Church of God Manchester - A place of worship, fellowship, and spiritual growth in Manchester, UK.',
  keywords: [
    'Mahanaim Church of God',
    'Church Manchester',
    'Church of God Manchester',
    'Christian Church Manchester',
    'Worship Manchester',
    'Fellowship Manchester',
  ],
  ogImage: '/mahanaim-logo.png',
};

export const pageMetadata: Record<string, PageMeta> = {
  home: {
    title: 'Mahanaim Church of God Manchester',
    description:
      'Mahanaim Church of God Manchester - A place of worship, fellowship, and spiritual growth.',
    path: '/',
  },
  about: {
    title: 'About Us | Mahanaim Church of God Manchester',
    description:
      'Learn about our vision, mission, values, and history at Mahanaim Church of God Manchester.',
    path: '/about',
  },
  sermons: {
    title: 'Messages | Mahanaim Church of God Manchester',
    description:
      'Watch sermons and messages from Mahanaim Church of God Manchester.',
    path: '/sermons',
  },
  gallery: {
    title: 'Gallery | Mahanaim Church of God Manchester',
    description:
      'View photos and memories from Mahanaim Church of God Manchester.',
    path: '/gallery',
  },
  leadership: {
    title: 'Leadership | Mahanaim Church of God Manchester',
    description:
      'Meet the leadership team at Mahanaim Church of God Manchester.',
    path: '/leadership',
  },
  contact: {
    title: 'Contact | Mahanaim Church of God Manchester',
    description:
      'Get in touch with Mahanaim Church of God Manchester. Find our address, phone, email, and service times.',
    path: '/contact',
  },
};
