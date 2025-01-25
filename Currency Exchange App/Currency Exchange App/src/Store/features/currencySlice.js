import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  baseCurrency: 'USD',
  targetCurrency: 'EUR',
  exchangeRate: 1,
  amount: 1,
  convertedAmount: 0,
  error: null,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrencies(state, action) {
      const { baseCurrency, targetCurrency } = action.payload;
      state.baseCurrency = baseCurrency;
      state.targetCurrency = targetCurrency;
    },
    setExchangeRate(state, action) {
      state.exchangeRate = action.payload;
    },
    setConvertedAmount(state, action) {
      state.convertedAmount = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setAmount(state, action) {
      state.amount = action.payload;
    },
  },
});

export const { setCurrencies, setExchangeRate, setConvertedAmount, setError, setAmount } = currencySlice.actions;
export default currencySlice.reducer;
