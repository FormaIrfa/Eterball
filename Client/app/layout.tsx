'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import '../styles/globals.scss'; // import global SCSS
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { store } from './store/auth';
import { Bangers, Poppins } from 'next/font/google';

const bangers = Bangers({ weight: ['400'] });

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <body className={`${(bangers.className, poppins.className)} antialiased`}>
        {/* Redux Provider global */}
        <Provider store={store}>
          <div className="app-container">
            {/* Navbar */}
            <Navbar />

            {/* Contenu des pages */}
            <main id="content">{children}</main>

            {/* Footer */}
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
