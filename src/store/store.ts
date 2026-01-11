import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import themeReducer from './themeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  AsyncStorage.setItem('cart', JSON.stringify(state.cart));
  AsyncStorage.setItem('theme', JSON.stringify(state.theme));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
