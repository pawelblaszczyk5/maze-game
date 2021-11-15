import { useEffect, useRef } from 'react';

export const useWindowEventListener = <K extends keyof WindowEventMap>(
  eventName: K,
  handler: (e: WindowEventMap[K]) => void,
) => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (e: WindowEventMap[K]) => handlerRef.current(e);

    window.addEventListener(eventName, listener);

    return () => window.removeEventListener(eventName, listener);
  }, [eventName]);
};
