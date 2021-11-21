import { Coordinates, Maze, MazeCell } from '@/model/maze';

type CoordinatesKey = `${number}_${number}`;
type MazeNodesMap = Map<CoordinatesKey, MazeNode>;

interface MazeNode {
  cell: MazeCell;
  estimatedValue: number;
  distanceFromStart: number;
  estimatedDistanceToEnd: number;
  parent?: MazeNode;
}

export const solveMaze = (maze: Maze): Array<MazeCell> => {
  const startingCell = maze[0][0];
  const endingCell = maze[maze.length - 1][maze.length - 1];
  const openMap: MazeNodesMap = new Map<CoordinatesKey, MazeNode>();
  const closedMap: MazeNodesMap = new Map<CoordinatesKey, MazeNode>();
  const startingNode: MazeNode = {
    cell: startingCell,
    estimatedValue: 0,
    distanceFromStart: 0,
    estimatedDistanceToEnd: getDistanceBetweenCoordinates(
      startingCell.coordinates,
      endingCell.coordinates,
    ),
  };

  addMazeNodeToMap(startingNode, openMap);

  while (openMap.size) {
    const bestNode = getBestNode(Array.from(openMap.values()));
    const neighboursNodes = setupNodes(
      getPassableNeighbours(bestNode.cell, maze),
      bestNode,
      endingCell.coordinates,
    );

    const endingNode = neighboursNodes.find((node) =>
      compareCoordinates(node.cell.coordinates, endingCell.coordinates),
    );

    if (endingNode) return backtrackPath(endingNode);

    removeMazeNodeFromMap(bestNode.cell.coordinates, openMap);
    neighboursNodes.forEach((node) => {
      const nodeFromOpenList = getMazeNodeFromMap(
        node.cell.coordinates,
        openMap,
      );

      if (
        !nodeFromOpenList ||
        nodeFromOpenList.estimatedValue > node.estimatedValue
      ) {
        const nodeFromClosedList = getMazeNodeFromMap(
          node.cell.coordinates,
          closedMap,
        );

        if (
          !nodeFromClosedList ||
          nodeFromClosedList.estimatedValue > node.estimatedValue
        ) {
          addMazeNodeToMap(node, openMap);
        }
      }
    });
    addMazeNodeToMap(bestNode, closedMap);
  }

  return [];
};

const backtrackPath = (node: MazeNode): Array<MazeCell> => {
  const path = [];
  let currentNode: MazeNode = node;

  while (currentNode.parent) {
    if (currentNode.parent) currentNode = currentNode.parent;

    path.push(currentNode.cell);
  }

  return path;
};

const getDistanceBetweenCoordinates = (
  { x: x1, y: y1 }: Coordinates,
  { x: x2, y: y2 }: Coordinates,
) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

const setupNodes = (
  cells: Array<MazeCell>,
  parent: MazeNode,
  endCoordinates: Coordinates,
): Array<MazeNode> =>
  cells.map((cell) => {
    const estimatedDistanceToEnd = getDistanceBetweenCoordinates(
      cell.coordinates,
      endCoordinates,
    );

    return {
      cell,
      estimatedValue: parent.distanceFromStart + 1 + estimatedDistanceToEnd,
      distanceFromStart: parent.distanceFromStart + 1,
      estimatedDistanceToEnd,
      parent,
    };
  });

const getBestNode = (nodes: Array<MazeNode>): MazeNode =>
  nodes.reduce((currentNode, previousNode) =>
    previousNode.estimatedValue < currentNode.estimatedValue
      ? previousNode
      : currentNode,
  );

const compareCoordinates = (
  { x: x1, y: y1 }: Coordinates,
  { x: x2, y: y2 }: Coordinates,
) => x1 === x2 && y1 === y2;

const addMazeNodeToMap = (node: MazeNode, map: MazeNodesMap) =>
  map.set(`${node.cell.coordinates.y}_${node.cell.coordinates.x}`, node);

const getMazeNodeFromMap = ({ x, y }: Coordinates, map: MazeNodesMap) =>
  map.get(`${y}_${x}`);

const removeMazeNodeFromMap = ({ x, y }: Coordinates, map: MazeNodesMap) =>
  map.delete(`${y}_${x}`);

const getPassableNeighbours = (
  { coordinates: { x, y } }: MazeCell,
  maze: Maze,
): Array<MazeCell> => {
  const neighbours: Array<MazeCell> = [];

  if (maze[y + 1]?.[x]?.walls.top === false) neighbours.push(maze[y + 1][x]);
  if (maze[y - 1]?.[x]?.walls.bottom === false) neighbours.push(maze[y - 1][x]);
  if (maze[y]?.[x + 1]?.walls.left === false) neighbours.push(maze[y][x + 1]);
  if (maze[y]?.[x - 1]?.walls.right === false) neighbours.push(maze[y][x - 1]);

  return neighbours;
};
