import { Provider } from 'react-redux';
import CurrencyConverter from './currencyConverter';
import store from './Store/store';


function App() {
  
  return (
    <>
    <Provider store={store}>
      <CurrencyConverter></CurrencyConverter>
    </Provider>  
    </>
  )
}

export default App
