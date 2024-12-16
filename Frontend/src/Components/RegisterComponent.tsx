import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice'; // Ujisti se, že importuješ správnou akci
import { useNavigate } from 'react-router-dom';
import Styles from '../Styles/RegisterComponent.module.scss'

const RegisterComponent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Deklarace proměnných pro formulář
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Typování response z axios
      const response: AxiosResponse<{ token: string; userId: string; userName: string }> = await axios.post(
        'http://localhost:3000/register',
        {
          userName,
          firstName,
          lastName,
          email,
          password,
        }
      );

      const { token, userId: returnedUserId ,userName: returnedUserName } = response.data;

      // Uložení do Reduxu
      dispatch(setUser({ token, userId: returnedUserId, userName: returnedUserName }));

      // Uložení do localStorage s vypršením za 1 den
      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 1 den v milisekundách
      localStorage.setItem('token', token);
      localStorage.setItem('userName', returnedUserName);
      localStorage.setItem('userId', returnedUserId);
      localStorage.setItem('expirationTime', expirationTime.toString());

      // Vyčištění formuláře
      setUserName('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      navigate('/')
    } catch {
      setError('Chyba při registraci. Zkuste to prosím znovu.');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Uživatelské jméno"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Jméno"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Příjmení"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Heslo"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={Styles.buttonGradient} type="submit">Registrovat</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default RegisterComponent;
