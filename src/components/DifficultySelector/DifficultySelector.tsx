import { Difficulty } from '@/model/enums/difficulty';
import { Button } from '@/components/Button';
import { buttonsContainer } from '@/components/DifficultySelector/DifficultySelector.css';

interface DifficultySelectorProps {
  onDifficultyChosen: (gameDifficulty: Difficulty) => void;
}

export const DifficultySelector = ({
  onDifficultyChosen,
}: DifficultySelectorProps) => (
  <div className={buttonsContainer}>
    <Button onClick={() => onDifficultyChosen(Difficulty.EASY)}>Easy</Button>
    <Button onClick={() => onDifficultyChosen(Difficulty.NORMAL)}>
      Normal
    </Button>
    <Button onClick={() => onDifficultyChosen(Difficulty.HARD)}>Hard</Button>
  </div>
);
