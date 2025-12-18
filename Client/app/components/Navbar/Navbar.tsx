'use client';

import { useState, type FC } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/auth';
import UserMenu from '../userMenu/UserMenu';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import useAuth from '../../hook/useAuth';
import './navbar.scss';

const Navbar: FC = () => {
  useAuth(); // hook client

  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleGoToLogin = () => {
    router.push(`/login?from=${encodeURIComponent(pathname)}`);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

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

        <div id="burger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div id="menus" className={menuOpen ? 'open' : ''}>
          <ul id="menu">
            <li className="dropdown">
              <p>Jeu</p>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/ladders">Ladders</Link>
                </li>
                <li>
                  <Link href="/classes">Classes</Link>
                </li>
                <li>
                  <Link href="/decouvrir">Découvrir</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/actus">Actus</Link>
            </li>
            <li>
              <Link href="/boutique">Boutique</Link>
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
