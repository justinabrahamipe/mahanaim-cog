import type { MetadataRoute } from 'next';
import { siteMetadata, pageMetadata } from '@/config/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(pageMetadata).map((page) => ({
    url: `${siteMetadata.siteUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.path === '/' ? 'weekly' : 'monthly',
    priority: page.path === '/' ? 1 : 0.8,
  }));
}
