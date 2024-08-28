import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'isDarkMode');

  useEffect(function (){
    if(isDarkMode){
      document.documentElement.classList.add('dark-mode');
    }else{
      document.documentElement.classList.remove('dark-mode');  // remove dark-mode class if darkMode is false  // add dark-mode class if darkMode is true  // toggle dark-mode class based on the value of isDarkMode  // toggle dark-mode class based on the value of isDarkMode  // toggle dark-mode class based on the value of isDarkMode  // toggle dark-mode class based on the value of isDarkMode  // toggle dark-mode class based on the value of isDarkMode  // toggle dark-mode class based on the value of isDarkMode  // toggle dark-mode class based on the value of isDarkMode  // toggle dark-mode class based on the value of isDarkMode  // toggle dark-mode class based on the value of isDarkMode  // toggle dark-mode class based on the value of isDarkMode  // toggle dark-mode class based on the value of isDark
    }
  }, [isDarkMode])
  const toogleDarkMode = () => setIsDarkMode((darkMode) => !darkMode);

  return (
    <DarkModeContext.Provider
      value={{ isDarkMode, toogleDarkMode }}
    >{children}</DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}

export default DarkModeProvider;
