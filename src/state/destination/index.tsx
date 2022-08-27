import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Airport } from '../../utils/types';

const initialState: Airport = {
  AirportCode: "",
  AirportName: "",
  CountryCode: "",
  city: "",
  citycode: "",
  cityunicode: "",
  country: "",
  id: "",
  isActive: false,
  lat: -91,
  long: -181,
  timezone: "",
  zone: "",
}

export const destinationSlice = createSlice({
  name: 'destination',
  initialState,
  reducers: {
    updateDestination: (state: Airport, action: PayloadAction<Airport>) => {
      state.AirportCode = action.payload.AirportCode;
      state.AirportName = action.payload.AirportName;
      state.CountryCode = action.payload.CountryCode;
      state.city = action.payload.city;
      state.citycode = action.payload.citycode;
      state.cityunicode = action.payload.cityunicode;
      state.country = action.payload.country;
      state.id = action.payload.id;
      state.isActive = action.payload.isActive;
      state.lat = action.payload.lat;
      state.long = action.payload.long;
      state.timezone = action.payload.timezone;
      state.zone = action.payload.zone;
    },
  },
})

export const { updateDestination } = destinationSlice.actions

export const destination = (state: any) => state.destination.value

export default destinationSlice.reducer
