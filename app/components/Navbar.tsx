'use client';

import type { FC } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/auth';
import UserMenu from './UserMenu';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const pathname = usePathname();

  const handleGoToLogin = () => {
    // On passe l'origine via query params
    router.push(`/login?from=${encodeURIComponent(pathname)}`);
  };

  return (
    <header id="navbar">
      <nav id="hors-connexion">
        <div id="logo-container">
          <Link href="/">
            <Image
              src="/Logo.png"
              alt="logo"
              width={120}
              height={110}
              id="logo-nav"
            />
          </Link>
        </div>

        <div id="menus">
          <ul id="menu">
            <li>
              <p>Jeu</p>
            </li>
            <li>
              <Link href="/actus">
                <p>Actus</p>
              </Link>
            </li>
            <li>
              <Link href="/boutique">
                <p>Boutique</p>
              </Link>
            </li>
            <li>
              <p>Autres</p>
            </li>
          </ul>
        </div>

        <div id="connexion">
          <ul id="connecter">
            <div id="langue">
              <li id="planete">
                <Image
                  src="/assets/planete.png"
                  alt="planete"
                  width={32}
                  height={32}
                />
              </li>
              <li>FR</li>
            </div>
            <li id="compte">
              {user ? (
                <UserMenu />
              ) : (
                <Image
                  src="/assets/icons8-user-48.png"
                  alt="icône compte"
                  width={32}
                  height={32}
                  style={{ cursor: 'pointer' }}
                  onClick={handleGoToLogin}
                />
              )}
            </li>
            <li>
              <button id="jouer">Jouer</button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
