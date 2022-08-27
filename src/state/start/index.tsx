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

export const startSlice = createSlice({
  name: 'start',
  initialState,
  reducers: {
    updateStartingPoint: (state: Airport, action: PayloadAction<Airport>) => {
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

export const { updateStartingPoint } = startSlice.actions

// export const startingPoint = (state: Airport) => state

export default startSlice.reducer
