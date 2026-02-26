import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import { generatePageMetadata, generateChurchSchema } from '@/lib/seo';

export const metadata: Metadata = {
  ...generatePageMetadata('home'),
  metadataBase: new URL('https://mahanaimcog.org'),
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateChurchSchema()) }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
