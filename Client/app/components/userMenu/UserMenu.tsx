'use client';

import { useRef, useState, useEffect, type FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/auth';
import { logout } from '../../store/auth/authSlice';
import Image from 'next/image';

import styles from './UserMenu.module.scss';

const UserMenu: FC = () => {
  const user = useSelector((s: RootState) => s.auth.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  if (!user) return null;

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const handleEnter = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const handleLeave = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <div
      ref={wrapRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={styles.wrapper}
    >
      {/* Avatar (déclencheur) */}
      <Image
        src="/assets/Coupe_Casquette.png"
        alt="avatar utilisateur"
        width={40}
        height={40}
        className={styles.avatar}
        onClick={() => setOpen((v) => !v)}
      />

      {/* Menu déroulant */}
      {open && (
        <div role="menu" aria-label="menu utilisateur" className={styles.menu}>
          <div className={styles.header}>
            <Image
              src="/assets/Coupe_Casquette.png"
              alt="avatar"
              width={40}
              height={40}
              className={styles.avatar}
            />
            <p className={styles.username}>{user.name}</p>
          </div>

          <div className={styles.content}>
            <div className={styles.eterBox}>
              <p>Eter : {user.eter}</p>
              <a href="/acheter-eter">Acheter des Eter</a>
            </div>

            <div className={styles.links}>
              <a href="/compte">Gestion de compte</a>
              <a href="/securite">Protéger votre compte !</a>
            </div>

            <button
              onClick={() => dispatch(logout())}
              className={styles.logout}
            >
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
