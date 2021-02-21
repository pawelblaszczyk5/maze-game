import {useEffect, useState} from 'react';

export const useCheat = (cheatCode: string, handler: () => void) => {
  const [keys, setKeys] = useState<Array<string>>([]);
  const isCheating = keys.join('') === cheatCode;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    document.addEventListener('keypress', (e: KeyboardEvent) => {
      setKeys((currentKeys) => [...currentKeys, e.key]);
      clearTimeout(timeout);
      timeout = setTimeout(() => setKeys([]), 5000);
    });
    
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (isCheating) {
      handler();
      setKeys([]);
    }
  }, [isCheating, handler]);

  return isCheating;
};

