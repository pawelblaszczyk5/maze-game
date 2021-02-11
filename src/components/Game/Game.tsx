import {useEffect, useState} from 'react';
import {CellCoordinates, generateMaze, Maze} from '../../helpers/maze/maze';
import {Board} from '../Board/Board';

const getRandomCell = (width: number, height: number): CellCoordinates => ({
  x: Math.floor(Math.random() * (width + 1)),
  y: Math.floor(Math.random() * (height + 1)),
});

export const Game = () => {
  const [maze, setMaze] = useState<Maze>();
  const [width, setWidth] = useState<number>(30);
  const [height, setHeight] = useState<number>(30);
  const [playerPosition, setPlayerPosition] = useState<CellCoordinates>({x: 0, y: 0});

  useEffect(() => {
    setMaze(generateMaze(width, height, getRandomCell(width, height)));
  }, [width, height]);

  return (
    <div className="Game">
      {maze && <Board maze={maze} player={playerPosition}/>}
    </div>
  );
};
