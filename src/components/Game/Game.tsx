import { Difficulty } from '@/model/enums/difficulty';
import { useMaze } from '@/hooks/useMaze';
import { Board } from '@/components/Board';

interface GameProps {
  initialDifficulty: Difficulty;
}

export const Game = ({ initialDifficulty }: GameProps) => {
  const { maze, generateNewMaze } = useMaze(initialDifficulty);

  return <Board board={maze} />;
};
