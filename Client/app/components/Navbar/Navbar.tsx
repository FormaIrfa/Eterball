'use client';
import { useState, useEffect, type FC } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/auth';
import UserMenu from '../userMenu/UserMenu';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import useAuth from '../../hook/useAuth';
import './navbar.scss';

const Navbar: FC = () => {
  useAuth();
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGoToLogin = () => {
    router.push(`/login?from=${encodeURIComponent(pathname)}`);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setOpenDropdown(null); // Fermer les dropdowns quand on ouvre/ferme le menu
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  if (!mounted) {
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
              <li className="dropdown">
                <span className="dropdown-toggle">Jeu</span>
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
                <Image
                  src="/assets/icons8-user-48.png"
                  alt="icône compte"
                  width={32}
                  height={32}
                  style={{ cursor: 'pointer' }}
                />
              </li>
              <li>
                <button id="jouer">Jouer</button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }

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

        <div id="menus" className={menuOpen ? 'open' : ''}>
          <ul id="menu">
            <li
              className={`dropdown ${openDropdown === 'jeu' ? 'active' : ''}`}
            >
              <span
                className="dropdown-toggle"
                onClick={() => toggleDropdown('jeu')}
              >
                Jeu
              </span>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/ladders" onClick={closeMenu}>
                    Ladders
                  </Link>
                </li>
                <li>
                  <Link href="/classes" onClick={closeMenu}>
                    Classes
                  </Link>
                </li>
                <li>
                  <Link href="/decouvrir" onClick={closeMenu}>
                    Découvrir
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/actus" onClick={closeMenu}>
                Actus
              </Link>
            </li>
            <li>
              <Link href="/boutique" onClick={closeMenu}>
                Boutique
              </Link>
            </li>
            <li>
              <p>Autres</p>
            </li>
          </ul>

          {/* Bouton Jouer visible uniquement dans le menu mobile */}
          {menuOpen && (
            <button id="jouer" onClick={closeMenu}>
              Jouer
            </button>
          )}
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

          <div id="burger" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
