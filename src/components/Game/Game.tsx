import { Difficulty } from '@/model/enums/difficulty';

interface GameProps {
  initialDifficulty: Difficulty;
}

export const Game = ({ initialDifficulty }: GameProps) => {
  return <h1>{initialDifficulty}</h1>;
};
