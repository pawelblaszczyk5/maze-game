import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrophy} from '@fortawesome/free-solid-svg-icons';
import './GameResult.css';
import {useEffect, useState} from 'react';

export const GameResult = ({moves, bestMoves}: { moves: number, bestMoves: number }) => {
  enum GameScore {
    GOOD,
    MEDIOCRE,
    BAD
  }

  const [gameScore, setGameScore] = useState<GameScore>(GameScore.BAD);

  useEffect(() => {
    if (moves * 0.85 <= bestMoves) {
      setGameScore(GameScore.GOOD);
    } else if (moves * 0.7 <= bestMoves) {
      setGameScore(GameScore.MEDIOCRE);
    } else {
      setGameScore(GameScore.BAD);
    }
  }, [GameScore, moves, bestMoves]);

  const getColorByScore = (score: GameScore): string => {
    switch (score) {
      case GameScore.GOOD: {
        return '#4d194d';
      }
      case GameScore.MEDIOCRE: {
        return '#3e1f47';
      }
      case GameScore.BAD: {
        return '312244';
      }
    }
  };

  const getMessageByScore = (score: GameScore): string => {
    switch (score) {
      case GameScore.GOOD: {
        return 'Congratulations! You are the best!';
      }
      case GameScore.MEDIOCRE: {
        return 'Good job but probably you could do better!';
      }
      case GameScore.BAD: {
        return 'Maybe try again and get a better score?';
      }
    }
  };

  return (
    <div className="GameResult">
      <FontAwesomeIcon icon={faTrophy} size={'6x'} style={{color: getColorByScore(gameScore)}}/>
      <p className="GameResult__text">
        {getMessageByScore(gameScore)}
        <br/>
        You finished in {moves} moves.
      </p>
    </div>
  );
};
