export interface Coordinates {
  x: number;
  y: number;
}

export interface MazeCell {
  coordinates: {
    x: number;
    y: number;
  };
  walls: {
    bottom: boolean;
    top: boolean;
    right: boolean;
    left: boolean;
  };
  visitedDuringGenerating: boolean;
}

export type Maze = Array<Array<MazeCell>>;
