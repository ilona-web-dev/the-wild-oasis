import { useState, useEffect } from 'react';

export function useLocalStorageState(initialState, key) {
   const isBrowser = typeof window !== 'undefined';

   const [value, setValue] = useState(function () {
      if (!isBrowser) return initialState;
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialState;
   });

   useEffect(
      function () {
         if (!isBrowser) return;
         localStorage.setItem(key, JSON.stringify(value));
      },
      [value, key, isBrowser]
   );

   return [value, setValue];
}
