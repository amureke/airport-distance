import { configureStore } from '@reduxjs/toolkit';
import startReducer from './start';
import destinationReducer from './destination';

const store = configureStore({
  reducer: {
    start: startReducer,
    destination: destinationReducer
  },
});

export default store;