import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrencies, setExchangeRate, setConvertedAmount, setError, setAmount } from './Store/features/currencySlice';
import { fetchExchangeRate } from './Api';

const CurrencyConverter = () => {
  const dispatch = useDispatch();
  const { baseCurrency, targetCurrency, exchangeRate, amount, convertedAmount, error } = useSelector((state) => state.currency);

  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        const rate = await fetchExchangeRate(baseCurrency, targetCurrency);
        dispatch(setExchangeRate(rate));
        const convertedValue = amount * rate;
        dispatch(setConvertedAmount(convertedValue));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    if (baseCurrency && targetCurrency) {
      getExchangeRate();
    }
  }, [baseCurrency, targetCurrency, amount, dispatch]);

  const handleCurrencyChange = (e) => {
    const { name, value } = e.target;
    if (name === 'baseCurrency' || name === 'targetCurrency') {
      dispatch(setCurrencies({
        baseCurrency: name === 'baseCurrency' ? value : baseCurrency,
        targetCurrency: name === 'targetCurrency' ? value : targetCurrency,
      }));
    }
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    dispatch(setAmount(newAmount));
    dispatch(setConvertedAmount(newAmount * exchangeRate));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Currency Converter</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Base Currency</label>
        <select name="baseCurrency" value={baseCurrency} onChange={handleCurrencyChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          {/* Add more currencies here */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Target Currency</label>
        <select name="targetCurrency" value={targetCurrency} onChange={handleCurrencyChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          {/* Add more currencies here */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input type="number" value={amount} onChange={handleAmountChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" />
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          {amount} {baseCurrency} = {convertedAmount.toFixed(2)} {targetCurrency}
        </h2>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default CurrencyConverter;
