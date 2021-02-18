import {CellCoordinates, Maze, MazeCell} from '../../helpers/maze/maze';
import './Board.css';

export const Board = ({maze, player}: { maze: Maze, player: CellCoordinates }) => {
  const getCellStyle = (cell: MazeCell) => {
    return {
      borderBottomWidth: cell.bottomWall ? '1px' : undefined,
      borderLeftWidth: cell.leftWall ? '1px' : undefined,
      borderTopWidth: cell.topWall ? '1px' : undefined,
      borderRightWidth: cell.rightWall ? '1px' : undefined,
      backgroundColor: (cell.coordinates.x === player.x && cell.coordinates.y === player.y) ? '#8a97a0' : undefined
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
          <div style={getCellStyle(cell)} key={`${cell.coordinates.y}${cell.coordinates.x}`} className="BoardCell"/>
        ));
      })}
    </div>
  );
};

