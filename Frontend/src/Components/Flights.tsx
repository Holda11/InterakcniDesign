import React, { useEffect, useState } from "react";
import { FlightsGetter, Flight } from "../FlightsGetter";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setArrivalCity, setArrivalIATA, setDepartureCity, setDepartureDate, setDepartureIATA, setReturnArrivalCity, setReturnArrivalIATA, setReturnDate, setReturnDepartureCity, setReturnDepartureIATA, setLayovers, setPrice } from "../store/flightSlice";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/Flights.module.scss";

const Flights: React.FC = () => {
  const [flights, setFlights] = useState<{ departure: Flight; arrival: Flight }[]>([]);
  const [sortedFlights, setSortedFlights] = useState<{ departure: Flight; arrival: Flight }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"best" | "cheapest" | "shortest">("best");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { departureIATA, arrivalIATA, departureDate, returnDate } = useSelector(
    (state: RootState) => state.FlightForm
  );

  // Funkce pro načtení letů
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const departureFlights = await FlightsGetter(
          departureIATA || "PRG",
          arrivalIATA || "AUS",
          departureDate || "2024-12-22"
        );

        const arrivalFlights = await FlightsGetter(
          arrivalIATA || "AUS",
          departureIATA || "PRG",
          returnDate || "2024-12-28"
        );

        // Ověření dat
        if (!Array.isArray(departureFlights) || !Array.isArray(arrivalFlights)) {
          throw new Error("Invalid flight data format.");
        }

        // Párování letů
        const pairedFlights = departureFlights.map((departure, index) => ({
          departure,
          arrival: arrivalFlights[index] || arrivalFlights[0], // Záložní párování
        }));

        setFlights(pairedFlights);
        sortFlights(pairedFlights); // Inicializace seřazených letů
      } catch (err) {
        console.error("Error fetching flight data:", err);
        setError("Nepodařilo se načíst data o letech.");
      }
    };

    fetchFlights();
  }, [departureIATA, arrivalIATA, departureDate, returnDate]);

  // Seřazení letů podle zvoleného filtru
  const sortFlights = (flightsToSort: { departure: Flight; arrival: Flight }[]) => {
    let sorted = [...flightsToSort];
    switch (filter) {
      case "cheapest":
        sorted.sort(
          (a, b) =>
            a.departure.price + a.arrival.price - (b.departure.price + b.arrival.price)
        );
        break;
      case "shortest":
        sorted.sort(
          (a, b) =>
            a.departure.duration + a.arrival.duration -
            (b.departure.duration + b.arrival.duration)
        );
        break;
      case "best":
        sorted.sort(
          (a, b) =>
            ((a.departure.price + a.arrival.price) / 10) + a.departure.duration + a.arrival.duration -
            (((b.departure.price + b.arrival.price) / 10) + b.departure.duration + b.arrival.duration)
        );
        break;
      default:
        sorted.sort(
          (a, b) => {
            const aScore =
              a.departure.price + a.arrival.price +
              (a.departure.duration + a.arrival.duration) * 0.1;
            const bScore =
              b.departure.price + b.arrival.price +
              (b.departure.duration + b.arrival.duration) * 0.1;
            return aScore - bScore;
          }
        );
        break;
    }
    setSortedFlights(sorted);
  };

  // Reakce na změnu filtru
  useEffect(() => {
    sortFlights(flights);
  }, [filter, flights]);

  // Obsluha změny filtru
  const handleFilterChange = (newFilter: "best" | "cheapest" | "shortest") => {
    setFilter(newFilter);
  };

  // Obsluha výběru letu
  const handleSelectedFlight = (pair: { departure: Flight; arrival: Flight }) => {
    dispatch(setDepartureCity(pair.departure.departure_airport.name));
    dispatch(setArrivalCity(pair.departure.arrival_airport.name));
    dispatch(setDepartureIATA(pair.departure.departure_airport.id));
    dispatch(setArrivalIATA(pair.departure.arrival_airport.id));
    dispatch(setReturnDepartureCity(pair.arrival.departure_airport.name));
    dispatch(setReturnArrivalCity(pair.arrival.arrival_airport.name));
    dispatch(setReturnDepartureIATA(pair.arrival.departure_airport.id));
    dispatch(setReturnArrivalIATA(pair.arrival.arrival_airport.id));
    dispatch(setPrice(pair.departure.price + pair.arrival.price));

    // Opravené zpracování dat pro API: Formátujeme pouze datum bez času (YYYY-MM-DD)
    const formatDate = (dateString: string | null) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      return date.toISOString().split('T')[0]; // Vezmeme část před 'T'
    };

    const formattedDepartureDate = formatDate(pair.departure.arrival_airport.time);
    dispatch(setDepartureDate(formattedDepartureDate));

    const formattedReturnDate = formatDate(pair.arrival.arrival_airport.time);
    dispatch(setReturnDate(formattedReturnDate));

    // Spojení layoverů z obou letů
    const layovers = [
      ...(pair.departure.layovers || []),
      ...(pair.arrival.layovers || []),
    ];

    dispatch(setLayovers(layovers));

    navigate('/Payment');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.InfoBox}>
      <h2>Vyhledané lety</h2>
      <div className={styles.button}>
        <button className={styles.buttonGradient} onClick={() => handleFilterChange("best")}>Nejlepší</button>
        <button className={styles.buttonGradient} onClick={() => handleFilterChange("cheapest")}>Nejlevnější</button>
        <button className={styles.buttonGradient} onClick={() => handleFilterChange("shortest")}>Nejkratší</button>
      </div>
      </div>
      
      <ul className={styles.list}>
        {sortedFlights.map((pair, index) => (
          <li key={index}>
            <div className={styles.Gapper}>
              <div className={styles.Cell}>
                <h3>Let TAM (departure)</h3>
                <div>
                  <strong>
                    {pair.departure.departure_airport.name} →{" "}
                    {pair.departure.arrival_airport.name}
                  </strong>
                  <div className={styles.Space}>
                    <span><strong>Doba letu:</strong> {Math.round(pair.departure.duration / 60)} H</span>
                    <span><strong>Cena:</strong> {pair.departure.price} Kč</span>
                  </div>
                  <div className={styles.Layovers}>
                    <strong>Přestupy:</strong>
                    {pair.departure.layovers && pair.departure.layovers.length > 0 ? (
                      <ul>
                        {pair.departure.layovers.map((layover, idx) => (
                          <li key={idx}>
                            <span>{layover.name}</span> - Doba přestupu: {Math.round(layover.duration / 60)} H
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>Žádný přestup</span>
                    )}
                  </div>
                </div>
              </div>


              <div className={styles.Cell}>
                <h3>Let ZPĚT (arrival)</h3>
                <div>
                  <strong>
                    {pair.arrival.departure_airport.name} →{" "}
                    {pair.arrival.arrival_airport.name}
                  </strong>
                  <div className={styles.Space}>
                    <span><strong>Doba letu:</strong> {Math.round(pair.arrival.duration / 60)} H</span>
                    <span><strong>Cena:</strong> {pair.arrival.price} Kč</span>
                  </div>
                  <div className={styles.Layovers}>
                    <strong>Přestupy:</strong>
                    {pair.arrival.layovers && pair.arrival.layovers.length > 0 ? (
                      <ul>
                        {pair.arrival.layovers.map((layover, idx) => (
                          <li key={idx}>
                            <span>{layover.name}</span> - Doba přestupu: {Math.round(layover.duration / 60)} H
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>Žádný přestup</span>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.Choicer}>
                <button onClick={() => handleSelectedFlight(pair)}>Vybrat</button>
                <span>{pair.departure.price + pair.arrival.price} Kč</span>   
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flights;
