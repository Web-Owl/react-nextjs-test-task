import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(state.cart.cart));
    localStorage.setItem('phone', state.cart.phone);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;