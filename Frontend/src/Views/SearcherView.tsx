import Calendars from '../Components/Calendars'
import FlightSearch from '../Components/FlightSearch'
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from 'react-router-dom';

const SearcherView = () => {
  const { departureCity, arrivalCity, departureDate, returnDate } = useSelector((state: RootState) => state.FlightForm);
  const navigate = useNavigate()
  // Podmínka pro povolení tlačítka
  const isFormValid = departureCity && arrivalCity && departureDate && returnDate;

  return (
    <div>
      <FlightSearch />
      <Calendars />
      <button disabled={!isFormValid} onClick={()=> navigate('/Flights')}>Potvrdit</button>
    </div>
  );
}

export default SearcherView;
