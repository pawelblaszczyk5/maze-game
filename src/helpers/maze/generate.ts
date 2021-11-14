import { Size } from '@/model/size';
import { Maze, MazeCell } from '@/model/maze';

export const generateMaze = ({ width, height }: Size): Maze => {
  const maze: Maze = createMazeBoilerplate(width, height);
  const firstCell = maze[0][0];
  const cellStack: Array<MazeCell> = [maze[0][0]];

  firstCell.visitedDuringGenerating = true;

  const backTrack = (cell: MazeCell): void => {
    const neighbour = getRandomUnvisitedNeighbour(cell, maze);

    if (neighbour) {
      neighbour.visitedDuringGenerating = true;
      cellStack.push(neighbour);
      carveWalls([cell, neighbour]);
      backTrack(neighbour);
      return;
    }

    cellStack.pop();
    cellStack[cellStack.length - 1] &&
      backTrack(cellStack[cellStack.length - 1]);
  };

  backTrack(firstCell);
  return maze;
};

const createMazeBoilerplate = (width: number, height: number): Maze =>
  new Array(height).fill(null).map((_, currentY) =>
    new Array(width).fill(null).map((_, currentX) => ({
      walls: {
        top: true,
        bottom: true,
        left: true,
        right: true,
      },
      coordinates: { x: currentX, y: currentY },
      visitedDuringGenerating: false,
    })),
  );

const getRandomUnvisitedNeighbour = (
  { coordinates: { x, y } }: MazeCell,
  maze: Maze,
): MazeCell | undefined => {
  const neighbours: Array<MazeCell> = [];

  maze[y + 1]?.[x]?.visitedDuringGenerating === false &&
    neighbours.push(maze[y + 1][x]);
  maze[y - 1]?.[x]?.visitedDuringGenerating === false &&
    neighbours.push(maze[y - 1][x]);
  maze[y]?.[x + 1]?.visitedDuringGenerating === false &&
    neighbours.push(maze[y][x + 1]);
  maze[y]?.[x - 1]?.visitedDuringGenerating === false &&
    neighbours.push(maze[y][x - 1]);

  return neighbours[Math.floor(Math.random() * neighbours.length)];
};

const carveWalls = ([cell1, cell2]: [MazeCell, MazeCell]): void => {
  const directionToCarve = getCellsRelativeDirection([cell1, cell2]);

  switch (directionToCarve) {
    case RelativeDirection.UP: {
      cell1.walls.top = cell2.walls.bottom = false;
      break;
    }
    case RelativeDirection.DOWN: {
      cell1.walls.bottom = cell2.walls.top = false;
      break;
    }
    case RelativeDirection.RIGHT: {
      cell1.walls.right = cell2.walls.left = false;
      break;
    }
    case RelativeDirection.LEFT: {
      cell1.walls.left = cell2.walls.right = false;
      break;
    }
  }
};

const getCellsRelativeDirection = ([
  { coordinates: coordinates1 },
  { coordinates: coordinates2 },
]: [MazeCell, MazeCell]): RelativeDirection => {
  const isYDifference = coordinates1.y !== coordinates2.y;
  const isPositiveDifference = isYDifference
    ? coordinates1.y < coordinates2.y
    : coordinates1.x < coordinates2.x;

  if (isPositiveDifference) {
    return isYDifference ? RelativeDirection.DOWN : RelativeDirection.RIGHT;
  }
  return isYDifference ? RelativeDirection.UP : RelativeDirection.LEFT;
};

const enum RelativeDirection {
  UP,
  DOWN,
  RIGHT,
  LEFT,
}
