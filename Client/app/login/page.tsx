'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import './login.scss';
import { login } from '../store/auth/authSlice';
import { RootState } from '../store/auth';
import { API_ORIGIN } from '@/services/apiOrigin';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const isConnected = useSelector((store: RootState) => store.auth.isConnected);

  useEffect(() => {
    if (isConnected) {
      router.replace('/');
    }
  }, [isConnected, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Merci de remplir tous les champs!');
      return;
    }

    try {
      const response = await fetch(`${API_ORIGIN}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const err = await response.json();
        alert(err.error || 'Erreur lors de la connexion');
        return;
      }

      const data = await response.json();

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      dispatch(
        login({
          token: data.token,
          user: {
            id: data.user.id,
            name: data.user.username,
            avatar: '/assets/Coupe_Casquette.png',
            eter: data.user.eter ?? 0,
          },
        })
      );

      router.push('/');
    } catch (err) {
      console.error(err);
      alert('Erreur serveur');
    }
  };

  return (
    <div id="loginPage">
      <form onSubmit={handleLogin}>
        <h2>Connexion</h2>

        <label>
          <span>
            Nom d&apos;utilisateur <span id="star">*</span> :
          </span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label>
          <span>
            Mot de passe <span id="star">*</span> :
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Se connecter</button>

        <p>
          Pas encore de compte ? <Link href="/signup">S&apos;inscrire</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
