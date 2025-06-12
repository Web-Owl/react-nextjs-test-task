import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from 'react-redux';
import { store } from '../store';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { setDarkMode } from "../store/themeSlice";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      dispatch(setDarkMode(stored === "true"));
    }
  }, [dispatch]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return <>{children}</>;
}

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeWrapper>
        <Component {...pageProps} />
      </ThemeWrapper>
    </Provider>
  );
}


export default App;