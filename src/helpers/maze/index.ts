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
    if (neighbours.length > 1) {
      cellStack.push(nextCell);
    }
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

interface MazeNode {
  cell: MazeCell,
  estimatedVal: number,
  distanceFromStart: number,
  estimatedDistanceToEnd: number,
  parent?: MazeNode
}

export const findShortestPath = (maze: Maze) => {
  const start: MazeCell = maze[0][0];
  const end: MazeCell = maze[maze.length - 1][maze[0].length - 1];
  const openList: Array<MazeNode> = [];
  const closeList: Array<MazeNode> = [];

  const startNode: MazeNode = {
    cell: start,
    estimatedVal: 0,
    distanceFromStart: 0,
    estimatedDistanceToEnd: getDistance(start.coordinates, end.coordinates)
  };

  openList.push(startNode);
  while (openList.length) {
    const bestNode = getBestNode(openList);

    openList.splice(openList.findIndex(val => areObjectsSame(bestNode, val)), 1);
    const validSuccessorNodes = setUpNodes(getValidNeighboors(bestNode.cell, maze), bestNode, end.coordinates);
    const finishNode = validSuccessorNodes.find((node) => node.cell.coordinates.y === end.coordinates.y && node.cell.coordinates.x === end.coordinates.x);
    if (finishNode) {
      return backtrackBestPath(finishNode);
    } else {
      validSuccessorNodes.forEach((successorNode) => {
        const openListBetterCells = openList.filter((node) => {
          return successorNode.cell.coordinates.x === node.cell.coordinates.x &&
            successorNode.cell.coordinates.y === node.cell.coordinates.y &&
            node.estimatedVal < successorNode.estimatedVal;
        });
        if (!openListBetterCells.length) {
          const closedListBetterCells = closeList.filter((node) => {
            return successorNode.cell.coordinates.x === node.cell.coordinates.x &&
              successorNode.cell.coordinates.y === node.cell.coordinates.y &&
              node.estimatedVal < successorNode.estimatedVal;
          });
          if (!closedListBetterCells.length) {
            openList.push(successorNode);
          }
        }
      });
    }
    closeList.push(bestNode);
  }

};

const getDistance = (startCoordinates: CellCoordinates, endCoordinates: CellCoordinates) => {
  return Math.abs(startCoordinates.x - endCoordinates.x) + Math.abs(startCoordinates.y - endCoordinates.y);
};

const backtrackBestPath = (node: MazeNode): Array<MazeCell> => {
  const path = [];
  let currentNode: MazeNode = node;
  path.push(currentNode.cell);
  do {
    if (currentNode.parent) {
      currentNode = currentNode.parent;
    }
    path.push(currentNode.cell);
  } while (currentNode.parent);
  return path;
};

const getValidNeighboors = (cell: MazeCell, maze: Maze): Array<MazeCell> => {
  const validNeighbours: Array<MazeCell> = [];
  const allNeighbours: Array<MazeCell | undefined> = [];

  allNeighbours.push(
    cell.bottomWall ? undefined : maze?.[cell.coordinates.y + 1]?.[cell.coordinates.x],
    cell.topWall ? undefined : maze?.[cell.coordinates.y - 1]?.[cell.coordinates.x],
    cell.rightWall ? undefined : maze?.[cell.coordinates.y]?.[cell.coordinates.x + 1],
    cell.leftWall ? undefined : maze?.[cell.coordinates.y]?.[cell.coordinates.x - 1]
  );

  allNeighbours.forEach(val => {
    if (val !== undefined) {
      validNeighbours.push(val);
    }
  });

  return validNeighbours;
};

const setUpNodes = (cells: Array<MazeCell>, parent: MazeNode, endCoordinates: CellCoordinates): Array<MazeNode> => {
  return cells.map((cell): MazeNode => {
    let estimatedDistanceToEnd = getDistance(cell.coordinates, endCoordinates);
    return {
      cell,
      estimatedVal: parent.distanceFromStart + 1 + estimatedDistanceToEnd,
      distanceFromStart: parent.distanceFromStart + 1,
      estimatedDistanceToEnd,
      parent
    };
  });
};

const getBestNode = (nodes: Array<MazeNode>): MazeNode => {
  return nodes.reduce((currentNode, previousNode) => {
    return previousNode.estimatedVal < currentNode.estimatedVal ? previousNode : currentNode;
  });
};

const areObjectsSame = (x: object, y: object): boolean => {
  const xEntries = Object.values((x));
  const yEntries = Object.values((y));
  let areSame = true;
  
  xEntries.forEach((entry, index) => {
    if (entry !== yEntries[index]) {
      areSame = false;
    }
  });

  return areSame;
};
