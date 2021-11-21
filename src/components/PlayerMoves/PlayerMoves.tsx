import { RelativeDirection } from '@/model/enums/relativeDirection';
import { useEffect, useMemo, useState } from 'react';
import { Coordinates, Maze } from '@/model/maze';
import { useWindowEventListener } from '@/hooks/useWindowEventListener';
import { Move } from '@/model/move';
import { ArrowKey } from '@/model/enums/arrowKey';
import {
  arrowsContainer,
  arrowTile,
  arrowTileInvalid,
} from '@/components/PlayerMoves/PlayerMoves.css';
import { KEY_TO_DIRECTION, KEY_TO_SYMBOL, KEY_TO_WALL } from '@/constants/key';

interface PlayerMovesProps {
  onPlayerMove: (direction: RelativeDirection) => void;
  board: Maze;
  playerPosition: Coordinates;
  onGameFinish: (moves: number) => void;
}

export const PlayerMoves = ({
  onPlayerMove,
  board,
  playerPosition,
  onGameFinish,
}: PlayerMovesProps) => {
  const [allMoves, setAllMoves] = useState<Array<Move>>([]);
  const movesToDisplay = useMemo(() => allMoves.slice(-5), [allMoves]);

  const keyDownHandler = ({ key }: KeyboardEvent) => {
    if (
      key === ArrowKey.UP ||
      key === ArrowKey.DOWN ||
      key === ArrowKey.LEFT ||
      key === ArrowKey.RIGHT
    ) {
      const isValidMove =
        !board[playerPosition.y][playerPosition.x].walls[KEY_TO_WALL[key]];

      if (isValidMove) {
        onPlayerMove(KEY_TO_DIRECTION[key]);
      }
      setAllMoves((moves) => [...moves, { key, valid: isValidMove }]);
    }
  };

  useEffect(() => {
    if (
      playerPosition.y === board.length - 1 &&
      playerPosition.x === board.length - 1
    ) {
      onGameFinish(allMoves.length);
    }
  }, [board, allMoves, onGameFinish, playerPosition]);

  useWindowEventListener('keydown', keyDownHandler);

  return (
    <div className={arrowsContainer}>
      {movesToDisplay.map(({ key, valid }, index) => (
        <div
          className={`${arrowTile} ${!valid ? arrowTileInvalid : ''}`}
          key={index}
        >
          {KEY_TO_SYMBOL[key]}
        </div>
      ))}
    </div>
  );
};
