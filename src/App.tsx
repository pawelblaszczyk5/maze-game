import { useCallback, useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { Difficulty } from '@/model/enums/difficulty';
import { Game } from '@/components/Game';
import { mainContainer, screenDisclaimer } from '@/App.css';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export const App = () => {
  const [isGameInProgress, setIsGameInProgress] = useState(false);
  const [initialDifficulty, setInitialDifficulty] = useState<Difficulty>();
  const isScreenLargeEnough = useMediaQuery(
    'screen and (min-width: 1024px) and (min-height: 768px)',
  );

  const startGame = useCallback((difficulty: Difficulty) => {
    setIsGameInProgress(true);
    setInitialDifficulty(difficulty);
  }, []);

  if (!isScreenLargeEnough) {
    return (
      <main className={mainContainer}>
        <h1 className={screenDisclaimer}>
          This game is suitable for keyboard usage and desktop‑sized screens
        </h1>
      </main>
    );
  }

  return (
    <main className={mainContainer}>
      {isGameInProgress && initialDifficulty ? (
        <Game initialDifficulty={initialDifficulty} />
      ) : (
        <WelcomeScreen onGameStart={startGame} />
      )}
    </main>
  );
};
