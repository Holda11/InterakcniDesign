import React, { useState, useEffect } from "react";
import data from "../DummyData.ts";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setArrivalCity, setArrivalIATA, setDepartureCity, setDepartureIATA } from "../store/flightSlice";
import styles from "../Styles/FlightSearch.module.scss";

interface Location {
  city: string;
  state: string;
  airport: string;
  iata: string;
}

const FlightSearch: React.FC = () => {
  const [filteredLocationsDeparture, setFilteredLocationsDeparture] = useState<Location[]>([]);
  const [filteredLocationsArrival, setFilteredLocationsArrival] = useState<Location[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { departureCity, arrivalCity } = useSelector((state: RootState) => state.FlightForm);

  useEffect(() => {
    // Filtr pro departureCity
    if (departureCity.trim()) {
      const results = data.filter(
        (location) =>
          location.city.toLowerCase().includes(departureCity.toLowerCase()) ||
          location.airport.toLowerCase().includes(departureCity.toLowerCase()) ||
          location.iata.toLowerCase().includes(departureCity.toLowerCase())
      );
      setFilteredLocationsDeparture(results);
    } else {
      setFilteredLocationsDeparture([]);
    }

    // Filtr pro arrivalCity
    if (arrivalCity.trim()) {
      const results = data.filter(
        (location) =>
          location.city.toLowerCase().includes(arrivalCity.toLowerCase()) ||
          location.airport.toLowerCase().includes(arrivalCity.toLowerCase()) ||
          location.iata.toLowerCase().includes(arrivalCity.toLowerCase())
      );
      setFilteredLocationsArrival(results);
    } else {
      setFilteredLocationsArrival([]);
    }
  }, [departureCity, arrivalCity]);

  const handleSelectDeparture = (location: Location) => {
    dispatch(
      setDepartureCity(`${location.city} (${location.iata}) - ${location.airport}`)
    );
    dispatch(
      setDepartureIATA(`${location.iata}`)
    )
    setFilteredLocationsDeparture([]); // Vymazání seznamu
  };

  const handleSelectArrival = (location: Location) => {
    dispatch(
      setArrivalCity(`${location.city} (${location.iata}) - ${location.airport}`)
    );
    dispatch(
      setArrivalIATA(`${location.iata}`)
    )
    setFilteredLocationsArrival([]); // Vymazání seznamu
  };

  return (
    <div className={styles.flightSearchContainer}>
        <div className={styles.inputGroup}>
          <input className={styles.input}
            type="text"
            placeholder="Odkud"
            value={departureCity}
            onChange={(e) => dispatch(setDepartureCity(e.target.value))}
          />
          {filteredLocationsDeparture.length > 0 && (
            <ul className={styles.list}>
              {filteredLocationsDeparture.map((location) => (
                <li key={location.iata} onClick={() => handleSelectDeparture(location)}>
                  {location.city} ({location.iata}) - {location.airport}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.inputGroup}>
          <input className={styles.input}
            type="text"
            placeholder="Kam"
            value={arrivalCity}
            onChange={(e) => dispatch(setArrivalCity(e.target.value))}
          />
          {filteredLocationsArrival.length > 0 && (
            <ul className={styles.list}>
              {filteredLocationsArrival.map((location) => (
                <li key={location.iata} onClick={() => handleSelectArrival(location)}>
                  {location.city} ({location.iata}) - {location.airport}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
  );
};

export default FlightSearch;
