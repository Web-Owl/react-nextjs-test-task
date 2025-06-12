import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  darkMode: boolean;
  colors: {
    background: string;
    text: string;
  };
}

const darkColors = {
  background: '#222222',
  text: '#F0F0F0',
};

const lightColors = {
  background: '#FFFFFF',
  text: '#000000',
};

const initialState: ThemeState = {
  darkMode: true,
  colors: darkColors,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      state.colors = state.darkMode ? darkColors : lightColors;
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
      state.colors = state.darkMode ? darkColors : lightColors;
    },
  },
});

export const { toggleDarkMode, setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;