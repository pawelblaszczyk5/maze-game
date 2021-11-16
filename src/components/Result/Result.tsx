import { Difficulty } from '@/model/enums/difficulty';
import { GameResult } from '@/model/gameResult';
import { DifficultySelector } from '@/components/DifficultySelector';
import { resultText } from '@/components/Result/Result.css';

interface ResultProps {
  onNewGame: (difficulty: Difficulty) => void;
  result: GameResult;
}

const getText = (result: GameResult) => {
  const relativeResult = result.moves / result.perfectMoves;

  if (relativeResult < 1.1) {
    return 'Congratulations, you rocking it! 🥳';
  }
  if (relativeResult < 1.3) {
    return 'Close to awesomeness! 👊';
  }
  return 'You could definitely do better 😞';
};

export const Result = ({ onNewGame, result }: ResultProps) => {
  const textToDisplay = getText(result);

  return (
    <>
      <h2 className={resultText}>
        {textToDisplay} You finished in {result.moves} moves :)
      </h2>
      <DifficultySelector onDifficultyChosen={onNewGame} />
    </>
  );
};
