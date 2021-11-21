import { useCallback, useEffect, useRef, useState } from 'react';

export const useMediaQuery = (mediaQuery: string) => {
  const mediaQueryListRef = useRef(window.matchMedia(mediaQuery)).current;
  const [matchesMediaQuery, setMatchesMediaQuery] = useState<boolean>(
    mediaQueryListRef.matches,
  );

  const mediaQueryChangeCallback = useCallback(
    ({ matches }) => setMatchesMediaQuery(matches),
    [],
  );

  useEffect(() => {
    mediaQueryListRef.addEventListener('change', mediaQueryChangeCallback);

    return () =>
      mediaQueryListRef.removeEventListener('change', mediaQueryChangeCallback);
  }, [mediaQueryChangeCallback, mediaQueryListRef]);

  return matchesMediaQuery;
};
