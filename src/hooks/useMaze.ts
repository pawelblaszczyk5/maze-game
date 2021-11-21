import { useCallback, useMemo, useState } from 'react';
import { generateMaze, solveMaze } from '@/helpers/maze';
import { Difficulty } from '@/model/enums/difficulty';
import { Size } from '@/model/size';

const MAZE_SIZE: Record<Difficulty, Size> = {
  [Difficulty.EASY]: { width: 15, height: 15 },
  [Difficulty.NORMAL]: { width: 20, height: 20 },
  [Difficulty.HARD]: { width: 25, height: 25 },
};

export const useMaze = (initialDifficulty: Difficulty) => {
  const [maze, setMaze] = useState(() =>
    generateMaze(MAZE_SIZE[initialDifficulty]),
  );

  const solution = useMemo(() => solveMaze(maze), [maze]);

  const generateNewMaze = useCallback((difficulty: Difficulty) => {
    setMaze(generateMaze(MAZE_SIZE[difficulty]));
  }, []);

  return {
    maze,
    generateNewMaze,
    solution,
  };
};
