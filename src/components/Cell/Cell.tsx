import { MazeCell } from '@/model/maze';
import {
  singleCell,
  singleCellCurrentlyVisited,
  singleCellMazeEnd,
} from './Cell.css';
import { useMemo } from 'react';

interface CellProps {
  cell: MazeCell;
  playerVisiting: boolean;
  mazeEnd: boolean;
}

export const Cell = ({
  cell: { coordinates, walls },
  playerVisiting,
  mazeEnd,
}: CellProps) => {
  const cellStyles = useMemo(
    () => ({
      borderLeft: walls.left ? undefined : 0,
      borderRight: walls.right ? undefined : 0,
      borderTop: walls.top ? undefined : 0,
      borderBottom: walls.bottom ? undefined : 0,
    }),
    [walls],
  );

  return (
    <div
      style={cellStyles}
      className={`${singleCell} ${mazeEnd ? singleCellMazeEnd : ''} ${
        playerVisiting ? singleCellCurrentlyVisited : ''
      }`}
      key={`${coordinates.y}${coordinates.x}`}
    />
  );
};
