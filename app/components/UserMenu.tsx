'use client';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';
import { logout } from '../store/auth/authSlice';
import { RootState } from '../store/auth';

export default function UserMenu() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login'); // après déconnexion → page login
  };

  if (!user) return null;

  return (
    <div style={{ padding: 16 }}>
      <p>Bienvenue, {user.name} 👋</p>
      <img
        src={user.avatar}
        alt="avatar"
        style={{ width: 50, height: 50, borderRadius: '50%' }}
      />
      <button
        onClick={handleLogout}
        style={{
          marginTop: 16,
          padding: '8px 14px',
          background: '#e63946',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
        }}
      >
        Déconnexion
      </button>
    </div>
  );
}
