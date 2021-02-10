export type Maze = Array<Array<MazeCell>>;

export interface CellCoordinates {
  x: number;
  y: number;
}

export interface MazeCell {
  coordinates: CellCoordinates;
  topWall: boolean;
  bottomWall: boolean;
  leftWall: boolean;
  rightWall: boolean;
  visited: boolean;
}

const cellStack: Array<MazeCell> = [];

export const generateMaze = (width: number, height: number, startingPoint: CellCoordinates): Maze => {
  const maze: Maze = new Array(height).fill(null).map((el, y) => {
    return new Array(width).fill(null).map((el, x) => {
      const cell = {...initialCell};
      cell.coordinates = {y, x};
      return cell;
    });
  });
  cellStack.push(maze[startingPoint.y][startingPoint.x]);
  maze[startingPoint.y][startingPoint.x].visited = true;
  recursiveBackTrack(maze[startingPoint.y][startingPoint.x], maze);

  return maze;
};

const recursiveBackTrack = (previousCell: MazeCell, grid: Maze) => {
  const neighbours = getNeighbours(previousCell, grid).filter(cell => !cell.visited);
  if (neighbours.length) {
    const nextCell = neighbours[Math.floor(Math.random() * neighbours.length)];
    cellStack.push(nextCell);
    carveWalls(previousCell, nextCell);
    recursiveBackTrack(nextCell, grid);
  } else {
    cellStack.pop();
    if (cellStack.length) {
      recursiveBackTrack(cellStack[cellStack.length - 1], grid);
    }
  }
};

const carveWalls = (previousCell: MazeCell, nextCell: MazeCell) => {
  const xDiff = nextCell.coordinates.x - previousCell.coordinates.x;
  const yDiff = nextCell.coordinates.y - previousCell.coordinates.y;

  nextCell.visited = true;
  if (yDiff === -1) {
    previousCell.topWall = false;
    nextCell.bottomWall = false;
  } else if (yDiff === 1) {
    previousCell.bottomWall = false;
    nextCell.topWall = false;
  } else if (xDiff === -1) {
    previousCell.leftWall = false;
    nextCell.rightWall = false;
  } else if (xDiff === 1) {
    previousCell.rightWall = false;
    nextCell.leftWall = false;
  }
};

const getNeighbours = (cell: MazeCell, grid: Maze): Array<MazeCell> => {
  const neighbours: Array<MazeCell> = [];

  neighbours.push(
    grid?.[cell.coordinates.y + 1]?.[cell.coordinates.x],
    grid?.[cell.coordinates.y - 1]?.[cell.coordinates.x],
    grid?.[cell.coordinates.y]?.[cell.coordinates.x + 1],
    grid?.[cell.coordinates.y]?.[cell.coordinates.x - 1]
  );

  return neighbours.filter(val => val !== undefined);
};

const initialCell: MazeCell = {
  coordinates: {x: 0, y: 0},
  topWall: true,
  bottomWall: true,
  leftWall: true,
  rightWall: true,
  visited: false
};

