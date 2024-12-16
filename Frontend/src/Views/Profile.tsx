import { useNavigate } from 'react-router-dom';
import ListOfFlights from '../Components/ListOfFlights';
import styles from "../Styles/Profile.module.scss";

const Profile = () => {
    const userName = localStorage.getItem("userName")
    const navigate = useNavigate()
    
    const logOut = () =>{
        localStorage.clear()
        navigate('/')
    }

  return (
    <div className={styles.profileContainer}>
        <div>
            <h2>Vítejte {userName}</h2>
            <button className={styles.buttonLogout} onClick={logOut}>Odhlásit se</button>
        </div>
        <ListOfFlights/>
    </div>
  )
}

export default Profile