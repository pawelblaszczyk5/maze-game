import { Difficulty } from '@/model/enums/difficulty';
import { useMaze } from '@/hooks/useMaze';
import { Board } from '@/components/Board';
import { useCallback, useState } from 'react';
import { GameResult } from '@/model/gameResult';

interface GameProps {
  initialDifficulty: Difficulty;
}

export const Game = ({ initialDifficulty }: GameProps) => {
  const { maze, generateNewMaze } = useMaze(initialDifficulty);
  const [result, setResult] = useState<GameResult>();

  const finishGame = useCallback((result: GameResult) => setResult(result), []);

  const startNewGame = useCallback(
    (difficulty: Difficulty) => {
      setResult(undefined);
      generateNewMaze(difficulty);
    },
    [generateNewMaze],
  );

  return (
    <Board onGameFinish={finishGame} gameInProgress={!result} board={maze} />
  );
};
