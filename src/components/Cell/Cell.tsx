import { MazeCell } from '@/model/maze';
import {
  singleCell,
  singleCellCurrentlyVisited,
  singleCellMazeEnd,
  singleCellSolutionPart,
} from './Cell.css';
import { useMemo } from 'react';

interface CellProps {
  cell: MazeCell;
  playerVisiting: boolean;
  mazeEnd: boolean;
  solution: Array<MazeCell>;
  showSolution: boolean;
}

export const Cell = ({
  cell,
  playerVisiting,
  mazeEnd,
  solution,
  showSolution,
}: CellProps) => {
  const partOfTheSolution = useMemo(
    () => solution.includes(cell),
    [cell, solution],
  );

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
      className={`${singleCell} ${mazeEnd ? singleCellMazeEnd : ''} ${
        playerVisiting ? singleCellCurrentlyVisited : ''
      } ${showSolution && partOfTheSolution ? singleCellSolutionPart : ''}`}
      key={`${cell.coordinates.y}${cell.coordinates.x}`}
    />
  );
};
