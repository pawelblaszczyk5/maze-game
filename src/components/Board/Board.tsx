import {useEffect, useState} from 'react';
import {CellCoordinates, generateMaze, MazeCell} from './maze';
import './Board.css';

export const Board = () => {

  const [maze, setMaze] = useState<Array<Array<MazeCell>>>();

  const setUpMaze = () => {
    const width = 20;
    const height = 20;
    const startPoint: CellCoordinates = {x: 0, y: 0};
    setMaze(generateMaze(width, height, startPoint));
  };

  useEffect(setUpMaze, []);

  return (
    <div className="Board">
      {maze && maze.map((row) => (
        <>
          {row.map((cell) => (
            <div className="BoardCell">

            </div>
          ))}
        </>
      ))}
    </div>
  );
};
