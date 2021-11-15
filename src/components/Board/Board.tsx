import { Coordinates, Maze } from '@/model/maze';
import { container } from '@/components/Board/Board.css';
import { Cell } from '@/components/Cell';
import { useState } from 'react';

interface BoardProps {
  board: Maze;
}

export const Board = ({ board }: BoardProps) => {
  const [playerPosition, setPlayerPosition] = useState<Coordinates>({
    x: 0,
    y: 0,
  });

  return (
    <div
      className={container}
      style={{ '--current-board-height': board.length }}
    >
      {board.map((row, currentY) =>
        row.map((cell, currentX) => (
          <Cell
            cell={cell}
            playerVisiting={
              playerPosition.x === currentX && playerPosition.y === currentY
            }
            mazeEnd={
              cell.coordinates.x === board.length - 1 &&
              cell.coordinates.y === board.length - 1
            }
            key={`${currentY}${currentX}`}
          />
        )),
      )}
    </div>
  );
};
