import {Maze, MazeCell} from '../../helpers/maze/maze';
import './Board.css';

export const Board = ({maze}: { maze: Maze }) => {

    const getBorders = (cell: MazeCell) => {
      return {
        borderBottomWidth: cell.bottomWall ? '1px' : undefined,
        borderLeftWidth: cell.leftWall ? '1px' : undefined,
        borderTopWidth: cell.topWall ? '1px' : undefined,
        borderRightWidth: cell.rightWall ? '1px' : undefined
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
        {maze && maze.map((row) => (
          <>
            {row.map((cell) => (
              <div style={getBorders(cell)} className="BoardCell">

              </div>
            ))}
          </>
        ))}
      </div>
    );
  }
;
