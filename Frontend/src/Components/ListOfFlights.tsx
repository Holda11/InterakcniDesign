import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from '../Styles/ListOfFlights.module.scss'
interface FlightData {
  _id: string;
  departure_Airport: string;
  arrival_Airport: string;
  return_departure_Airport: string;
  return_arrival_Airport: string;
  departure_Date: string;
  return_Date: string;
  departure_IATA: string;
  arrival_IATA: string;
  price: string;
  layovers: string;
  user: string;
  __v: number;
}

const FlightList: React.FC = () => {
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    // Replace with your API endpoint
    axios
      .get<FlightData[]>(`http://127.0.0.1:3000/users/${userId}/flights`)
      .then((response) => {
          console.log(response.data)
        setFlights(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch data' + error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Historie Zakoupených letenek:</h2>
      <ul className={style["Flight"]}>
        {flights.map((flight) => (
          <li key={flight._id}>
            <div className={style["Flight__Body"]}>
              <h3>Let TAM (departure)</h3>
                <div>
                    <strong>
                        {flight.departure_Airport} → {flight.arrival_Airport}
                    </strong>
                    <div>
                        <span>Datum letu: {flight.departure_Date}</span>
                    </div>
                </div>
                <h3>Let ZPĚT (arrival)</h3>
                <div>
                    <strong>
                        {flight.arrival_Airport} → {flight.departure_Airport}
                    </strong>
                    <div>
                        <span>Datum letu: {flight.return_Date}</span>
                    </div>
                </div>
                <div>
                    <h3>Přestupy</h3>
                    <div>
                        {flight.layovers}
                    </div>
                </div>
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightList;
