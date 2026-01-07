'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './signup.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../store/auth';
import { API_ORIGIN } from '@/services/apiOrigin';

const SignUp = () => {
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

  useEffect(() => {
    if (isConnected) {
      router.replace('/');
    }
  }, [isConnected, router]);

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

    const birthDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
      2,
      '0'
    )}`;

    try {
      const response = await fetch(`${API_ORIGIN}/signup`, {
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

      await response.json();
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

        {/* le reste inchangé */}
      </form>
    </div>
  );
};

export default SignUp;
