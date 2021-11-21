import { Difficulty } from '@/model/enums/difficulty';
import { useMaze } from '@/hooks/';
import { Board } from '@/components/Board';
import { useCallback, useEffect, useState } from 'react';
import { GameResult } from '@/model/gameResult';
import { Result } from '@/components/Result';

interface GameProps {
  initialDifficulty: Difficulty;
}

export const Game = ({ initialDifficulty }: GameProps) => {
  const { maze, generateNewMaze, solution } = useMaze(initialDifficulty);
  const [result, setResult] = useState<GameResult>();

  const finishGame = useCallback((result: GameResult) => setResult(result), []);

  const startNewGame = useCallback(
    (difficulty: Difficulty) => {
      generateNewMaze(difficulty);
    },
    [generateNewMaze],
  );

  useEffect(() => {
    setResult(undefined);
  }, [maze]);

  return (
    <>
      <Board
        solution={solution}
        onGameFinish={finishGame}
        gameInProgress={!result}
        board={maze}
      />
      {result && <Result onNewGame={startNewGame} result={result} />}
    </>
  );
};
