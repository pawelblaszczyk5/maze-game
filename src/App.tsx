import { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { Difficulty } from '@/model/enums/difficulty';
import { Game } from '@/components/Game';
import { mainContainer } from '@/App.css';

export const App = () => {
  const [isGameInProgress, setIsGameInProgress] = useState(true);
  const [initialDifficulty, setInitialDifficulty] = useState<Difficulty>();

  const startGame = (difficulty: Difficulty) => {
    setIsGameInProgress(true);
    setInitialDifficulty(difficulty);
  };

  return (
    <main className={mainContainer}>
      {isGameInProgress && initialDifficulty ? (
        <Game initialDifficulty={initialDifficulty} />
      ) : (
        <WelcomeScreen onGameStart={startGame} />
      )}
      {/*{TODO ADD MEDIA QUERY TO HIDE WHOLE GAME AND ADD DISCLAIMER}*/}
    </main>
  );
};
