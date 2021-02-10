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

export const generateMaze = (width: number, height: number, startingPoint: CellCoordinates): Array<Array<MazeCell>> => {
  const maze: Array<Array<MazeCell>> = new Array(height).fill(null).map((el, y) => {
    return new Array(width).fill(null).map((el, x) => {
      const cell = {...initialCell};
      cell.coordinates = {y, x};
      return cell;
    });
  });

  const stack: Array<MazeCell> = [];

  return maze;
};

const carveMaze = () => {

};

const initialCell: MazeCell = {
  coordinates: {x: 0, y: 0},
  topWall: true,
  bottomWall: true,
  leftWall: true,
  rightWall: true,
  visited: false
};

