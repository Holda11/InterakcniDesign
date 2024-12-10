import DatePicker from "react-datepicker"
import style from "../Styles/Calendar.module.scss"
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setDepartureDate, setReturnDate } from "../store/flightSlice";

const Calendars = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { departureDate, returnDate } = useSelector((state: RootState) => state.FlightForm)

    return (
        <div>
            <div>
                <DatePicker 
                    className={style["react-datepicker"]}
                    selected={departureDate ? new Date(departureDate) : null}
                    onChange={(date) => {
                        if (date) {
                            const formattedDate = date.toISOString().split('T')[0];
                            dispatch(setDepartureDate(formattedDate));
                        } else {
                            dispatch(setDepartureDate(null));
                        }
                    }}
                    dateFormat="dd.MM.yyyy"
                    placeholderText="Datum odletu:"
                    minDate={new Date()}
                />
            </div>
            <div>
                <DatePicker
                    className={style["react-datepicker"]}
                    selected={returnDate ? new Date(returnDate) : null}
                    onChange={(date) => {
                        if (date) {
                            const formattedDate = date.toISOString().split('T')[0];
                            dispatch(setReturnDate(formattedDate));
                        } else {
                            dispatch(setReturnDate(null));
                        }
                    }}
                    dateFormat="dd.MM.yyyy"
                    placeholderText="Vyberte datum návratu"
                    minDate={departureDate ? new Date(departureDate) : new Date()} 
                />
            </div>
        </div>
    )
}

export default Calendars;
