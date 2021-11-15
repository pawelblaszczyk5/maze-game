import { Maze } from '@/model/maze';
import { container } from '@/components/Board/Board.css';
import { Cell } from '@/components/Cell';

interface BoardProps {
  board: Maze;
}

export const Board = ({ board }: BoardProps) => {
  return (
    <div
      className={container}
      style={{ '--current-board-height': board.length }}
    >
      {board.map((row, currentY) =>
        row.map((cell, currentX) => (
          <Cell cell={cell} key={`${currentY}${currentX}`} />
        )),
      )}
    </div>
  );
};
