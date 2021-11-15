import { MazeCell } from '@/model/maze';
import { singleCell } from './Cell.css';
import { useMemo } from 'react';

interface CellProps {
  cell: MazeCell;
}

export const Cell = ({ cell }: CellProps) => {
  const cellStyles = useMemo(
    () => ({
      borderLeft: cell.walls.left ? undefined : 0,
      borderRight: cell.walls.right ? undefined : 0,
      borderTop: cell.walls.top ? undefined : 0,
      borderBottom: cell.walls.bottom ? undefined : 0,
    }),
    [cell],
  );

  return (
    <div
      style={cellStyles}
      className={singleCell}
      key={`${cell.coordinates.y}${cell.coordinates.x}`}
    />
  );
};
