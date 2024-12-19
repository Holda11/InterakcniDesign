import { useNavigate } from 'react-router-dom';
import ListOfFlights from '../Components/ListOfFlights';
import style from "../Styles/Profile.module.scss";
import { clearUser } from '../store/userSlice';

const Profile = () => {
    const userName = localStorage.getItem("userName")
    const navigate = useNavigate()
    
    const logOut = () =>{
        localStorage.clear()
        clearUser()
        navigate('/')
    }

  return (
    <div className={style["Profile"]}>
        <div className={style["Profile__Left"]}>
            <h2>Vítejte {userName}</h2>
            <button  onClick={logOut}>Odhlásit se</button>
        </div>
        <div className={style["Profile__Right"]}>
        <ListOfFlights/>
        </div>
    </div>
  )
}

export default Profile