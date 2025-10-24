import { createContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
   const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

   const [isDarkMode, setIsDarkMode] = useLocalStorageState(
      prefersDark,
      'isDarkMode'
   );

   useEffect(
      function () {
         if (isDarkMode) {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
         } else {
            document.documentElement.classList.add('light-mode');
            document.documentElement.classList.remove('dark-mode');
         }
      },
      [isDarkMode]
   );

   function toggleDarkMode() {
      setIsDarkMode((isDark) => !isDark);
   }

   return (
      <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
         {children}
      </DarkModeContext.Provider>
   );
}

export { DarkModeProvider, DarkModeContext };
