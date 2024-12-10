import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Layover {
  airport: string;
  id: string;
  duration: number;
}

interface FlightFormState {
  departureCity: string;
  arrivalCity: string;
  departureIATA: string;
  arrivalIATA: string;
  returnDepartureCity: string;
  returnArrivalCity: string;
  returnDepartureIATA: string;
  returnArrivalIATA: string;
  departureDate: string | null;
  returnDate: string | null;
  price: number | string;
  layovers: Layover[] | null; // Upravte na pole pro více layoverů
}


const initialState: FlightFormState = {
  departureCity: "",
  arrivalCity: "",
  returnDepartureCity: "",
  returnArrivalCity: "",
  returnDepartureIATA: "",
  returnArrivalIATA: "",
  departureIATA: "",
  arrivalIATA: "",
  departureDate: null,
  returnDate: null,
  price: 0,
  layovers: null
};

const FlightFormSlice = createSlice({
  name: "FlightForm",
  initialState,
  reducers: {
    setDepartureCity(state, action: PayloadAction<string>) {
      state.departureCity = action.payload;
      console.log("Departure city:", state.departureCity);
    },
    setArrivalCity(state, action: PayloadAction<string>) {
      state.arrivalCity = action.payload; // Opraveno
      console.log("Arrival city:", state.arrivalCity);
    },
    setDepartureIATA(state, action: PayloadAction<string>) {
      state.departureIATA = action.payload;
    },
    setArrivalIATA(state, action: PayloadAction<string>){
      state.arrivalIATA = action.payload;
    },
    setReturnDepartureCity(state, action: PayloadAction<string>) {
      state.returnDepartureCity = action.payload;
      console.log("Departure city:", state.departureCity);
    },
    setReturnArrivalCity(state, action: PayloadAction<string>) {
      state.returnArrivalCity = action.payload; // Opraveno
      console.log("Arrival city:", state.arrivalCity);
    },
    setReturnDepartureIATA(state, action: PayloadAction<string>) {
      state.returnDepartureIATA = action.payload;
    },
    setReturnArrivalIATA(state, action: PayloadAction<string>){
      state.returnArrivalIATA = action.payload;
    },
    setDepartureDate(state, action: PayloadAction<string | null>) {
      state.departureDate = action.payload;
      console.log("Departure date:", state.departureDate);
    },
    setReturnDate(state, action: PayloadAction<string | null>) {
      state.returnDate = action.payload;
      console.log("Return date:", state.returnDate);
    },
    setLayovers(state, action: PayloadAction<Layover[] | null>) {
      state.layovers = action.payload;
    },
    setPrice(state, action: PayloadAction<number | string>){
      state.price = action.payload;
    },
    resetState(state){
      return initialState
    }
  },
});

export const {
  setDepartureCity,
  setArrivalCity,
  setArrivalIATA,
  setDepartureIATA,
  setDepartureDate,
  setReturnDate,
  setReturnDepartureCity,
  setReturnArrivalCity,
  setReturnDepartureIATA,
  setReturnArrivalIATA,
  setLayovers,
  setPrice,
  resetState
} = FlightFormSlice.actions;

export default FlightFormSlice.reducer;
