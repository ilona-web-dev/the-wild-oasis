import { useEffect, useRef } from 'react';

export function useOutsideClick(handler, listenCapturing = true) {
   const ref = useRef(null);

   useEffect(() => {
      function handleClick(e) {
         if (!ref.current || ref.current.contains(e.target)) return;
         handler(e);
      }

      document.addEventListener('pointerdown', handleClick, listenCapturing);

      return () =>
         document.removeEventListener('pointerdown', handleClick, listenCapturing);
   }, [handler, listenCapturing]);

   return ref;
}
