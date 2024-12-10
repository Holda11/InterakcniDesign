import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { resetState } from '../store/flightSlice';

const Success = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleFinish = () => {
        
        dispatch(resetState());
        navigate('/')
        
      };

  return (
    <div>
        <h2>Platba přijata!</h2>
        <p>Děkujeme za koupi</p>
        <button onClick={handleFinish}>Zpět na hlavní stránku</button>
    </div>
  )
}

export default Success