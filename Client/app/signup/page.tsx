'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './signup.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/auth';
import { API_ORIGIN } from '@/services/apiOrigin'; // adapte le chemin si besoin
import Link from 'next/link';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [usersurname, setUsersurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const router = useRouter();
  const isConnected = useSelector((s: RootState) => s.auth.isConnected);

  useEffect(() => {
    if (isConnected) router.replace('/');
  }, [isConnected, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !username ||
      !usersurname ||
      !email ||
      !password ||
      !confirmPassword ||
      !day ||
      !month ||
      !year
    ) {
      alert('Merci de remplir tous les champs !');
      return;
    }
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas !');
      return;
    }

    const birthDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
      2,
      '0'
    )}`;

    try {
      const res = await fetch(`${API_ORIGIN}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          surname: usersurname,
          email,
          password,
          birthDate,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        alert(
          data?.error || data?.message || 'Erreur lors de la création du compte'
        );
        return;
      }

      alert('Compte créé avec succès !');
      router.push('/login');
    } catch (err) {
      console.error(err);
      alert('Erreur serveur');
    }
  };

  return (
    <div id="signUpPage">
      <form onSubmit={handleSubmit} id="formSignUp">
        <h2 id="account">Créer un compte</h2>

        <label>
          <div className="label-row">
            Pseudo <span className="star">*</span>
          </div>
          <input
            id="infosCompte"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ton pseudo"
            autoComplete="username"
          />
        </label>

        <label>
          <div className="label-row">
            Nom <span className="star">*</span>
          </div>
          <input
            id="infosCompte"
            value={usersurname}
            onChange={(e) => setUsersurname(e.target.value)}
            placeholder="Ton nom"
            autoComplete="family-name"
          />
        </label>

        <label>
          <div className="label-row">
            Email <span className="star">*</span>
          </div>
          <input
            id="infosCompte"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ex: jason@mail.com"
            autoComplete="email"
          />
        </label>

        <label>
          <div className="label-row">
            Mot de passe <span className="star">*</span>
          </div>
          <input
            id="infosCompte"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            autoComplete="new-password"
          />
        </label>

        <label>
          <div className="label-row">
            Confirmation <span className="star">*</span>
          </div>
          <input
            id="infosCompte"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="********"
            autoComplete="new-password"
          />
        </label>

        <label>
          <div className="label-row">
            Date de naissance <span className="star">*</span>
          </div>
          <div id="age">
            <input
              id="date"
              value={day}
              onChange={(e) =>
                setDay(e.target.value.replace(/\D/g, '').slice(0, 2))
              }
              placeholder="JJ"
              inputMode="numeric"
            />
            <input
              id="date"
              value={month}
              onChange={(e) =>
                setMonth(e.target.value.replace(/\D/g, '').slice(0, 2))
              }
              placeholder="MM"
              inputMode="numeric"
            />
            <input
              id="date"
              value={year}
              onChange={(e) =>
                setYear(e.target.value.replace(/\D/g, '').slice(0, 4))
              }
              placeholder="AAAA"
              inputMode="numeric"
            />
          </div>
        </label>

        <button type="submit">Créer mon compte</button>

        <p>
          Déjà un compte ? <Link href="/login">Se connecter</Link>
        </p>
      </form>
    </div>
  );
}
