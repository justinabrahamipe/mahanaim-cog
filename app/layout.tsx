import type { Metadata } from 'next';
import { Bricolage_Grotesque, Manrope, Baloo_Chettan_2 } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { generatePageMetadata, generateChurchSchema } from '@/lib/seo';

const displayFont = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
});

const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
});

const malayalamFont = Baloo_Chettan_2({
  subsets: ['malayalam'],
  variable: '--font-malayalam',
});

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${displayFont.variable} ${bodyFont.variable} ${malayalamFont.variable}`}
    >
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
