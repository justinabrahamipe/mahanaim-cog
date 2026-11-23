import type { MetadataRoute } from 'next';
import { siteMetadata, pageMetadata } from '@/config/seo';
import { features } from '@/config/features';

// Pages switched off in src/config/features.ts stay out of the sitemap.
const hiddenPaths = new Set([
  ...(features.youthReels ? [] : ['/youth']),
  ...(features.magazine ? [] : ['/youth/magazine']),
]);

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(pageMetadata)
    .filter((page) => !hiddenPaths.has(page.path))
    .map((page) => ({
      url: `${siteMetadata.siteUrl}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.path === '/' ? 'weekly' : 'monthly',
      priority: page.path === '/' ? 1 : 0.8,
    }));
}
