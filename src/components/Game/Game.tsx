import {useEffect, useReducer, useState} from 'react';
import {CellCoordinates, generateMaze, Maze} from '../../helpers/maze/maze';
import {Board} from '../Board/Board';
import useEventListener from '@use-it/event-listener';

const getRandomCell = (width: number, height: number): CellCoordinates => ({
  x: Math.floor(Math.random() * (width + 1)),
  y: Math.floor(Math.random() * (height + 1)),
});

const arrowKeys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];

const playerPositionReducer = (state: CellCoordinates, key: KeyboardEvent): CellCoordinates => {
  console.log(state, key);
  return {x: 0, y: 0};
};

export const Game = () => {
  const [maze, setMaze] = useState<Maze>();
  const [width, setWidth] = useState<number>(30);
  const [height, setHeight] = useState<number>(30);
  const [playerPosition, setPlayerPosition] = useReducer(playerPositionReducer, {x: 0, y: 0});

  const handler = (e: KeyboardEvent) => {
    setPlayerPosition(e);
  };

  useEventListener('keydown', handler);

  useEffect(() => {
    setMaze(generateMaze(width, height, getRandomCell(width, height)));
  }, [width, height]);

  return (
    <div className="Game">
      {maze && <Board maze={maze} player={playerPosition}/>}
    </div>
  );
};
