import { useEffect } from 'react';
import { Provider } from 'react-redux'
import store from './sos/redux/store';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { addAuthenticationInterceptor } from './sos/services/AuthenticationService';
import { fetchCart } from './sos/services/CartService';
import { fetchAccount } from './sos/services/AccountService';

// ----------------------------------------------------------------------

export default function App() {

  useEffect(() => {
    const fetchData = async () => {
      addAuthenticationInterceptor();
      await fetchAccount();
      fetchCart();
    }
    fetchData();
  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider>
        <ScrollToTop />
        <BaseOptionChartStyle />
        <Router />
      </ThemeProvider>
    </Provider>
  );
}
