import { Difficulty } from '@/model/enums/difficulty';
import { GameResult } from '@/model/gameResult';
import { DifficultySelector } from '@/components/DifficultySelector';

interface ResultProps {
  onNewGame: (difficulty: Difficulty) => void;
  result: GameResult;
}

export const Result = ({ onNewGame, result }: ResultProps) => {
  return (
    <>
      <h1>Congratulations!You finished in {result.moves} moves :)</h1>
      <DifficultySelector onDifficultyChosen={onNewGame} />
    </>
  );
};
