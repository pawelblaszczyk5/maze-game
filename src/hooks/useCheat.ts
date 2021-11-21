import { useCallback, useEffect, useRef, useState } from 'react';
import { useWindowEventListener } from '@/hooks/';

export const useCheat = (cheatCode: Array<string>) => {
  const [cheating, setCheating] = useState(false);
  const cheatCodeRef = useRef(cheatCode);
  const enteredLetters = useRef<Array<string>>([]);
  const timeoutRef = useRef<number>();

  const toggleCheating = useRef(() => setCheating((cheating) => !cheating));

  const resetEnteredLetters = useRef(() => (enteredLetters.current = []));

  const keyPressHandler = useCallback((e: KeyboardEvent) => {
    if (e.code === cheatCodeRef.current[enteredLetters.current.length]) {
      enteredLetters.current = [...enteredLetters.current, e.key];

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(resetEnteredLetters.current, 2000);
    } else {
      enteredLetters.current = [e.key];
    }

    if (enteredLetters.current.length === cheatCodeRef.current.length) {
      toggleCheating.current();
      resetEnteredLetters.current();
    }
  }, []);

  useWindowEventListener('keypress', keyPressHandler);

  useEffect(() => {
    cheatCodeRef.current = cheatCode;
    enteredLetters.current = [];
  }, [cheatCode]);

  return cheating;
};
