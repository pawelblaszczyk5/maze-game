import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrophy} from '@fortawesome/free-solid-svg-icons';
import './GameResult.css';

export const GameResult = ({moves, bestMoves}: { moves: number, bestMoves: number }) => {
  let color: string;

  if (moves * 0.8 <= bestMoves) {
    color = '#4d194d';
  } else if (moves * 0.6 <= bestMoves) {
    color = '#3e1f47';
  } else {
    color = '312244';
  }

  return (
    <div className="GameResult">
      <FontAwesomeIcon icon={faTrophy} size={'6x'} style={{color: color}}/>
      <p className="GameResult__text">
        Congratulations! You finished in {moves} moves.
      </p>
    </div>
  );
};
