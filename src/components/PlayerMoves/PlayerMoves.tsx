import { RelativeDirection } from '@/model/enums/relativeDirection';
import { useState } from 'react';
import { Coordinates, Maze, MazeCell } from '@/model/maze';
import { useWindowEventListener } from '@/hooks/useWindowEventListener';
import { Move } from '@/model/move';
import { ArrowKey } from '@/model/enums/arrowKey';
import {
  arrowsContainer,
  arrowTile,
  arrowTileInvalid,
} from '@/components/PlayerMoves/PlayerMoves.css';

interface PlayerMovesProps {
  onPlayerMove: (direction: RelativeDirection) => void;
  board: Maze;
  playerPosition: Coordinates;
}

const KEY_TO_WALL: Record<ArrowKey, keyof MazeCell['walls']> = {
  [ArrowKey.DOWN]: 'bottom',
  [ArrowKey.UP]: 'top',
  [ArrowKey.LEFT]: 'left',
  [ArrowKey.RIGHT]: 'right',
};

const KEY_TO_DIRECTION: Record<ArrowKey, RelativeDirection> = {
  [ArrowKey.DOWN]: RelativeDirection.DOWN,
  [ArrowKey.UP]: RelativeDirection.UP,
  [ArrowKey.LEFT]: RelativeDirection.LEFT,
  [ArrowKey.RIGHT]: RelativeDirection.RIGHT,
};

const KEY_TO_SYMBOL: Record<ArrowKey, string> = {
  [ArrowKey.DOWN]: '↓',
  [ArrowKey.UP]: '↑',
  [ArrowKey.LEFT]: '←',
  [ArrowKey.RIGHT]: '→',
};

export const PlayerMoves = ({
  onPlayerMove,
  board,
  playerPosition,
}: PlayerMovesProps) => {
  const [moves, setMoves] = useState<Array<Move>>([]);
  const keyPressHandler = ({ key }: KeyboardEvent) => {
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
      setMoves((moves) => [...moves, { key, valid: isValidMove }].slice(-5));
    }
  };

  useWindowEventListener('keydown', keyPressHandler);

  return (
    <div className={arrowsContainer}>
      {moves.map(({ key, valid }, index) => (
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
