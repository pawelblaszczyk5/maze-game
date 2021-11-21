import { generateMaze } from '@/helpers/maze/';
import { solveMaze } from '@/helpers/maze/';
import { MazeCell } from '@/model/maze';

describe('Maze utils tests', () => {
  test('it should generate solvable maze', () => {
    const maze = generateMaze({ width: 20, height: 20 });
    const solution = solveMaze(maze);

    expect(maze).toBeDefined();
    expect(solution).toBeDefined();
  });

  test('solution should be valid', () => {
    const solution = solveMaze(generateMaze({ width: 5, height: 5 })).reverse();

    const isSolutionValid = (solution: Array<MazeCell>) => {
      let valid = true;

      solution.forEach((currentCell, index) => {
        const nextCell = solution[index + 1];

        if (!nextCell || !valid) {
          return;
        }

        if (currentCell.coordinates.x - nextCell.coordinates.x === -1) {
          valid = !currentCell.walls.right && !nextCell.walls.left;
          return;
        }

        if (currentCell.coordinates.x - nextCell.coordinates.x === 1) {
          valid = !currentCell.walls.left && !nextCell.walls.right;
          return;
        }

        if (currentCell.coordinates.y - nextCell.coordinates.y === -1) {
          valid = !currentCell.walls.bottom && !nextCell.walls.top;
          return;
        }

        if (currentCell.coordinates.y - nextCell.coordinates.y === 1) {
          valid = !currentCell.walls.top && !nextCell.walls.bottom;
          return;
        }
      });

      return valid;
    };

    expect(isSolutionValid(solution)).toEqual(true);
  });
});
