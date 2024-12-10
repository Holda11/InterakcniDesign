import axios from "axios";

interface Airport {
  name: string;
  id: string;
  time: string;
}

export interface Flight {
  departure_airport: Airport;
  arrival_airport: Airport;
  duration: number;
  airplane: string;
  airline: string;
  flight_number: string;
  travel_class: string;
  legroom: string;
  extensions: string[];
  price: number;
  layovers: string[] | null; 
}

interface FlightBundle {
  flights: Flight[];  // Pole letů
  price: number; 
  layovers: string[] | null;    
}

interface ApiResponse {
  best_flights: FlightBundle[];
  other_flights: FlightBundle[];
}

export async function FlightsGetter(depIATA: string, arrIATA: string, depDate: string): Promise<Flight[]> {
  try {
    console.log(`Fetching flights from API: http://127.0.0.1:3000/Flights?departure=${depIATA}&arrival=${arrIATA}&departureDate=${depDate}`);
    const response = await axios.get<ApiResponse>(`http://127.0.0.1:3000/Flights?departure=${depIATA}&arrival=${arrIATA}&departureDate=${depDate}`);
    const data = response.data;

    console.log(data)

    // Filtrace a výběr nejlepších letů s layover informacemi
    const bestFlights: Flight[] = data.best_flights.map((flightBundle: FlightBundle) => {
      const firstFlight = flightBundle.flights[0];
      const lastFlight = flightBundle.flights[flightBundle.flights.length - 1];
      const layOvers = flightBundle.layovers

      return {
        departure_airport: firstFlight.departure_airport,
        arrival_airport: lastFlight.arrival_airport,
        duration: flightBundle.flights.reduce((acc, flight) => acc + flight.duration, 0),
        airplane: firstFlight.airplane,
        airline: firstFlight.airline,
        flight_number: firstFlight.flight_number,
        travel_class: firstFlight.travel_class,
        legroom: firstFlight.legroom,
        extensions: firstFlight.extensions,
        price: flightBundle.price,
        layovers: layOvers
      };

    });

    // Filtrace a výběr ostatních letů s layover informacemi
    const otherFlights: Flight[] = data.other_flights.map((flightBundle: FlightBundle) => {
      const firstFlight = flightBundle.flights[0];
      const lastFlight = flightBundle.flights[flightBundle.flights.length - 1];
      const layOver = flightBundle.layovers

      return {
        departure_airport: firstFlight.departure_airport,
        arrival_airport: lastFlight.arrival_airport,
        duration: flightBundle.flights.reduce((acc, flight) => acc + flight.duration, 0),
        airplane: firstFlight.airplane,
        airline: firstFlight.airline,
        flight_number: firstFlight.flight_number,
        travel_class: firstFlight.travel_class,
        legroom: firstFlight.legroom,
        extensions: firstFlight.extensions,
        price: flightBundle.price,
        layovers: layOver
      };
    });

    // Spojení obou seznamů letů
    const flights: Flight[] = [...bestFlights, ...otherFlights];
    console.log("All Flights:", flights);  // Diagnostika pro všechny lety
    return flights;
  } catch (error) {
    console.error('Error fetching flight data:', error);
    throw error;
  }
}



