import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from '../Styles/Header.module.scss'

const Header: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Zkontrolujte, jestli jsou v localStorage uložena data
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <header>
      <div>
        {userName ? (
          <span onClick={()=> navigate('/Profile')}>Welcome, {userName}</span> // Zobrazení jména uživatele
        ) : (
          <button className={Styles.bntGradient} onClick={()=> navigate('/SingIn')}>Login</button> // Zobrazení tlačítka pro přihlášení
        )}
      </div>
    </header>
  );
};

export default Header;
