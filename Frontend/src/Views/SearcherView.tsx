import Calendars from '../Components/Calendars'
import FlightSearch from '../Components/FlightSearch'
import styles from "../Styles/SearcherView.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from 'react-router-dom';

const SearcherView = () => {
  const { departureCity, arrivalCity, departureDate, returnDate } = useSelector((state: RootState) => state.FlightForm);
  const navigate = useNavigate()
  // Podmínka pro povolení tlačítka
  const isFormValid = departureCity && arrivalCity && departureDate && returnDate;

  return (
    <div className={styles.searchViewContainer}>
    <div className={styles.Item}> 
      <FlightSearch /> 
    </div>
    <div className={styles.Item}> 
      <Calendars /> 
    </div>
    <div className={styles.Item} style={{ justifySelf: 'left' }}> 
      <h2>Hledání letenek</h2> 
    </div>
    <div className={styles.Item} style={{ justifySelf: 'right' }}> 
      <button className={styles.searchButton} disabled={!isFormValid} onClick={()=> navigate('/Flights')}>Hledat</button>
    </div>
  </div>
  );
}
export default SearcherView;
