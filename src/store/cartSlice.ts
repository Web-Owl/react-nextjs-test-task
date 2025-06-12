import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  phone: string;
}

const savedCart = typeof window !== 'undefined' ? localStorage.getItem('cart') : null;
const savedPhone = typeof window !== 'undefined' ? localStorage.getItem('phone') : null;

const initialState: CartState = {
  cart: savedCart ? JSON.parse(savedCart) : [],
  phone: savedPhone || '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<number>) {
      const item = state.cart.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ id: action.payload, quantity: 1 });
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      const item = state.cart.find((i) => i.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.cart = state.cart.filter((i) => i.id !== action.payload);
        }
      }
    },
    setItemQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.cart = state.cart.filter((i) => i.id !== id);
      } else {
        const item = state.cart.find((i) => i.id === id);
        if (item) {
          item.quantity = quantity;
        } else {
          state.cart.push({ id, quantity });
        }
      }
    },
    setPhone(state, action: PayloadAction<string>) {
      state.phone = action.payload;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addItem, removeItem, setItemQuantity, setPhone, clearCart } = cartSlice.actions;
export default cartSlice.reducer;