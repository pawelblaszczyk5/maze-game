import { Difficulty } from '@/model/enums/difficulty';
import { Size } from '@/model/size';

export const MAZE_SIZE: Record<Difficulty, Size> = {
  [Difficulty.EASY]: { width: 15, height: 15 },
  [Difficulty.NORMAL]: { width: 20, height: 20 },
  [Difficulty.HARD]: { width: 25, height: 25 },
};
