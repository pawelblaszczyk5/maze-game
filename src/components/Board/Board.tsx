import {useEffect, useState} from 'react';
import {CellCoordinates, generateMaze, Maze, MazeCell} from './maze';
import './Board.css';

export const Board = ({width, height, startPoint}: { width: number, height: number, startPoint: CellCoordinates }) => {

    const [maze, setMaze] = useState<Maze>();

    const setUpMaze = () => {
      setMaze(generateMaze(width, height, startPoint));
    };

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
        gridTemplateColumns: `repeat(${width},1fr)`,
        gridTemplateRows: `repeat(${height},1fr)`
      };
    };

    useEffect(setUpMaze, [width, height, startPoint]);

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
