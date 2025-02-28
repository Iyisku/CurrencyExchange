import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './features/currencySlice';

const store = configureStore({
  reducer: {
    currency: currencyReducer,
  },
});

export default store;