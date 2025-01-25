import axios from 'axios';

// Corrected API endpoint
const API_URL = 'https://api.freecurrencyapi.com/v1/latest';

// Updated fetchExchangeRate function
export const fetchExchangeRate = async (baseCurrency, targetCurrency) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'apikey': 'fca_live_KVSoOwqGGG9VGTY4d4aa49PI6DdYfL2fT5ktZN09', // API key in headers
      },
      params: {
        base_currency: baseCurrency,
        target_currency: targetCurrency,
      },
    });

    // If the API structure is correct, return the exchange rate
    return response.data.data[targetCurrency]; 
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw new Error('Failed to fetch exchange rates');
  }
};
