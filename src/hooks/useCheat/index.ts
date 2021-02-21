import {useEffect, useState} from 'react';

export const useCheat = (cheatCode: string, handler: () => void) => {
  const [keys, setKeys] = useState<Array<string>>([]);
  const isCheating = keys.join('') === cheatCode;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    document.addEventListener('keypress', (e: KeyboardEvent) => {
      if (cheatCode.includes(e.key)) {
        setKeys((currentKeys) => [...currentKeys, e.key]);
      } else {
        setKeys([]);
      }
      clearTimeout(timeout);
      timeout = setTimeout(() => setKeys([]), 5000);
    });
  }, [cheatCode]);

  useEffect(() => {
    if (isCheating) {
      handler();
      setKeys([]);
    }
  }, [isCheating, handler]);

  return isCheating;
};
