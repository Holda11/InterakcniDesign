import { useNavigate } from 'react-router-dom';
import ListOfFlights from '../Components/ListOfFlights';

const Profile = () => {
    const userName = localStorage.getItem("userName")
    const navigate = useNavigate()
    
    const logOut = () =>{
        localStorage.clear()
        navigate('/')
    }

  return (
    <div>
        <div>
            <h1>Vítejte {userName}</h1>
            <button onClick={logOut}>Odhlásit se</button>
        </div>
        <ListOfFlights/>
    </div>
  )
}

export default Profile