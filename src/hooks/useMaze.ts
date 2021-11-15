import { useCallback, useState } from 'react';
import { generateMaze } from '@/helpers/maze';
import { Difficulty } from '@/model/enums/difficulty';
import { MAZE_SIZE } from '@/constants/mazeSize';

export const useMaze = (initialDifficulty: Difficulty) => {
  const [maze, setMaze] = useState(() =>
    generateMaze(MAZE_SIZE[initialDifficulty]),
  );

  const generateNewMaze = useCallback((difficulty: Difficulty) => {
    setMaze(generateMaze(MAZE_SIZE[difficulty]));
  }, []);

  return {
    maze,
    generateNewMaze,
  };
};
