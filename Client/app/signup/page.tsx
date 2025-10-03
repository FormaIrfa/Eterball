'use client';

import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import Link from 'next/link';
import './signup.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../store/auth';

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
  const isConnected = useSelector((store: RootState) => store.auth.isConnected);
  const handleSubmit = async (e: React.FormEvent) => {
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

    // Construire une date ISO
    const birthDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
      2,
      '0'
    )}`;

    try {
      const response = await fetch('http://localhost:5000/signup', {
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

      if (!response.ok) {
        const err = await response.json();
        alert(err.error || 'Erreur lors de la création du compte');
        return;
      }

      const data = await response.json();
      console.log('Utilisateur créé :', data);
      alert('Compte créé avec succès !');
      router.push('/login');
    } catch (err) {
      console.error(err);
      alert('Erreur serveur');
    }
  };

  if (isConnected) redirect('/');

  return (
    <div id="signUpPage">
      <form onSubmit={handleSubmit} id="formSignUp">
        <h2 id="account">Créer un compte</h2>

        <label>
          <span>
            Adresse e-mail <span id="star">*</span> :
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="infosCompte"
          />
        </label>

        <label>
          <span>
            Nom <span id="star">*</span> :
          </span>
          <input
            type="text"
            value={usersurname}
            onChange={(e) => setUsersurname(e.target.value)}
            id="infosCompte"
          />
        </label>

        <label>
          <span>
            Prénom <span id="star">*</span> :
          </span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="infosCompte"
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
            id="infosCompte"
          />
        </label>

        <label>
          <span>
            Confirmer le mot de passe <span id="star">*</span> :
          </span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="infosCompte"
          />
        </label>

        <label>
          <span>
            Date de naissance <span id="star">*</span> :
          </span>
          <div id="age">
            <input
              type="number"
              placeholder="Jour"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              id="date"
            />
            <input
              type="number"
              placeholder="Mois"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              id="date"
            />
            <input
              type="number"
              placeholder="Année"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              id="date"
            />
          </div>
        </label>

        <button type="submit">S&apos;inscrire</button>

        <p>
          Déjà un compte ? <Link href="/login">Se connecter</Link>
        </p>
      </form>
    </div>
  );
}
