import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Baloo_Chettan_2 } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { generatePageMetadata, generateChurchSchema } from '@/lib/seo';

// One family for the whole site: light weights for headings, regular for body.
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
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
      className={`${jakarta.variable} ${malayalamFont.variable}`}
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
