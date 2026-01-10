import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../api/products';

type CartItem = Product & { quantity: number };

export type CartState = {
  items: CartItem[];
};

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) item.quantity++;
      else state.items.push({ ...action.payload, quantity: 1 });
    },
    increment(state, action: PayloadAction<number>) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity++;
    },
    decrementOrRemove(state, action: PayloadAction<number>) {
      const item = state.items.find(i => i.id === action.payload);
      if (!item) return;
      if (item.quantity > 1) item.quantity--;
      else state.items = state.items.filter(i => i.id !== action.payload);
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
    setCart(_state, action: PayloadAction<CartState>) {
      return action.payload;
    },
  },
});

export const {
  addToCart,
  increment,
  decrementOrRemove,
  removeItem,
  clearCart,
  setCart,
} = cartSlice.actions;

export const selectTotalItems = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);

export const selectSubtotal = (state: { cart: CartState }) =>
  Number(
    state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)
  );

export default cartSlice.reducer;
