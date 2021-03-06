import {CellCoordinates, Maze, MazeCell} from '../../helpers/maze/';
import './Board.css';

export const Board = ({maze, player, shortestPath}:
                        { maze: Maze, player: CellCoordinates, shortestPath: Array<MazeCell> }) => {
  const getCellStyle = (cell: MazeCell, maze: Maze) => {
    let backgroundColor: string | undefined;

    if (shortestPath.some(shortestPathCell => cell.coordinates.x === shortestPathCell.coordinates.x && shortestPathCell.coordinates.y === cell.coordinates.y)) {
      backgroundColor = '#3e1f4799';
    }

    if (cell.coordinates.x === player.x && cell.coordinates.y === player.y) {
      backgroundColor = '#8a97a0';
    } else if (cell.coordinates.y === maze.length - 1 && cell.coordinates.x === maze[0].length - 1) {
      backgroundColor = '#3e1f47';
    } else if (!backgroundColor) {
      backgroundColor = undefined;
    }
    
    return {
      borderBottomWidth: cell.bottomWall ? '1px' : undefined,
      borderLeftWidth: cell.leftWall ? '1px' : undefined,
      borderTopWidth: cell.topWall ? '1px' : undefined,
      borderRightWidth: cell.rightWall ? '1px' : undefined,
      backgroundColor: backgroundColor
    };
  };

  const getGridStyles = () => {
    return {
      gridTemplateColumns: `repeat(${maze[0].length},1fr)`,
      gridTemplateRows: `repeat(${maze.length},1fr)`
    };
  };

  return (
    <div className="Board" style={getGridStyles()}>
      {maze && maze.map((row) => {
        return row.map((cell) => (
          <div style={getCellStyle(cell, maze)} key={`${cell.coordinates.y}${cell.coordinates.x}`}
               className="BoardCell"/>
        ));
      })}
    </div>
  );
};

