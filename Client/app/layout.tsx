// app/layout.tsx ❌ PAS de 'use client'

import { ReactNode } from 'react';
import '../styles/globals.scss';

import ClientProviders from './ClientProviders';

import { Bangers, Poppins } from 'next/font/google';

const bangers = Bangers({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bangers',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} ${bangers.variable} antialiased`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
