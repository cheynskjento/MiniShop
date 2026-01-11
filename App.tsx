import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppNavigator from './src/app/AppNavigator';
import { store } from './src/store/store';
import { DarkNavTheme, LightNavTheme } from './src/theme/navigationTheme';
import type { RootState } from './src/store/store';
import { setCart } from './src/store/cartSlice';
import { setTheme } from './src/store/themeSlice';

const queryClient = new QueryClient();

function AppWithTheme() {
  const dispatch = useDispatch();
  const dark = useSelector((state: RootState) => state.theme.dark);

  useEffect(() => {
    (async () => {
      const cart = await AsyncStorage.getItem('cart');
      const theme = await AsyncStorage.getItem('theme');

      if (cart) dispatch(setCart(JSON.parse(cart)));
      if (theme) dispatch(setTheme(JSON.parse(theme).dark));
    })();
  }, []);

  return (
    <>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
      <NavigationContainer theme={dark ? DarkNavTheme : LightNavTheme}>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppWithTheme />
      </QueryClientProvider>
    </Provider>
  );
}
