'use client';
import { useDispatch } from 'react-redux';
import './Login.scss';
import { useRouter } from 'next/navigation';
import { login } from '../store/auth/authSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleFakeLogin = () => {
    dispatch(
      login({
        id: '1',
        name: 'Jason',
        avatar: '/assets/icons8-user-48.png',
        eter: 100,
      })
    );

    router.push('/'); // redirige vers la home après connexion
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>Connexion</h1>
      <button
        onClick={handleFakeLogin}
        style={{
          marginTop: 20,
          padding: '10px 16px',
          background: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
        }}
      >
        SE CONNECTER
      </button>
    </div>
  );
}
