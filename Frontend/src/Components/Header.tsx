import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Styles from '../Styles/Header.module.scss'
import style from '../Styles/Header.module.scss'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';



const Header: React.FC = () => {
  const [previousPath, setPreviousPath] = useState<string | null>(null)
  const navigate = useNavigate();
  const location = useLocation();
  const { userName } = useSelector((state: RootState) => state.User)

  const isNotRoot = location.pathname !== "/";

  useEffect(() => {
    // Ulož aktuální cestu jako "previousPath" při změně location.pathname
    return () => {
      setPreviousPath(location.pathname);
    };
  }, [location.pathname]);

  return (
    <header className={style["Header"]}>
        <div style={{ justifySelf: 'left' }}>
      {isNotRoot && previousPath && (
          <button onClick={() => navigate(previousPath)}>Zpátky</button>
        )}
        </div>
      <div onClick={() => navigate('/')} className={style["Header__Center"]}>
        <img src="logoflycatcher.png" alt="img" />
      </div>
      <div className={style["Header__Right"]} style={{ justifySelf: 'right' }}>
        {userName ? (
          <span onClick={() => navigate('/Profile')}>Welcome, {userName}</span> // Zobrazení jména uživatele
        ) : (
          <button className={Styles.bntGradient} onClick={() => navigate('/SingIn')}>Login</button> // Zobrazení tlačítka pro přihlášení
        )}
      </div>
    </header>
  );
};

export default Header;
