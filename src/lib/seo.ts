import type { Metadata } from 'next';
import { siteMetadata, pageMetadata } from '@/config/seo';

export function generatePageMetadata(page: string): Metadata {
  const meta = pageMetadata[page];
  if (!meta) {
    return {
      title: siteMetadata.siteName,
      description: siteMetadata.description,
    };
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: siteMetadata.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${siteMetadata.siteUrl}${meta.path}`,
      siteName: siteMetadata.siteName,
      images: [
        {
          url: siteMetadata.ogImage,
          width: 800,
          height: 600,
          alt: siteMetadata.siteName,
        },
      ],
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [siteMetadata.ogImage],
    },
  };
}

export function generateChurchSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: siteMetadata.siteName,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '21 Wilbraham Road',
      addressLocality: 'Manchester',
      postalCode: 'M14 6JS',
      addressCountry: 'GB',
    },
  };
}
