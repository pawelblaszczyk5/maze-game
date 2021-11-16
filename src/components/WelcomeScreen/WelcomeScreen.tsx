import { Difficulty } from '@/model/enums/difficulty';
import {
  description,
  heading,
} from '@/components/WelcomeScreen/WelcomeScreen.css';
import { DifficultySelector } from '@/components/DifficultySelector';

export interface WelcomeScreenProps {
  onGameStart: (gameDifficulty: Difficulty) => void;
}

export const WelcomeScreen = ({ onGameStart }: WelcomeScreenProps) => (
  <>
    <h1 className={heading}>Maze Game</h1>
    <p className={description}>
      The goal of this game is to solve the maze with the fewest moves. Use
      arrows to move through the labyrinth and find the quickest path. There are
      3 difficulties for you to choose. Good luck!
    </p>
    <DifficultySelector onDifficultyChosen={onGameStart} />
  </>
);
