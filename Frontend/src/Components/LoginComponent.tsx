import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice'; 
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    if (!email || !password) {
      setErrorMessage('Email a heslo jsou povinné!');
      return;
    }

    try {

      const response = await axios.post('http://localhost:3000/login', { email, password });

      if (response.data.token) {
    
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('userName', response.data.userName);
        
        dispatch(setUser({ token: response.data.token, userId: response.data.userId, userName: response.data.userName }));

        navigate('/')
      }
    } catch {
      setErrorMessage('Chyba při přihlašování! Zkontroluj své údaje.');
    }
  };

  return (
    <div className="login-form">
      <h2>Přihlášení</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Heslo</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Přihlásit se</button>
      </form>
    </div>
  );
};

export default LoginComponent;