import { configureStore } from "@reduxjs/toolkit"; 
import FlightFormReducer from './flightSlice'
import UserReducer from "./userSlice"

const store = configureStore({
    reducer: {
        FlightForm: FlightFormReducer,
        User: UserReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store