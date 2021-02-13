import {useEffect, useState} from 'react';
import {CellCoordinates, generateMaze, Maze} from '../../helpers/maze/maze';
import {Board} from '../Board/Board';
import {Keys} from '../Keys/Keys';
import useEventListener from '@use-it/event-listener';
import {ArrowKey} from '../../helpers/interfaces/ArrowKey';

const arrowKeys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];

const ARROW_SYMBOLS: { [key: string]: string } = {
  ArrowDown: '↓',
  ArrowUp: '↑',
  ArrowLeft: '←',
  ArrowRight: '→'
};

const getRandomCell = (width: number, height: number): CellCoordinates => ({
  x: Math.floor(Math.random() * (width + 1)),
  y: Math.floor(Math.random() * (height + 1)),
});

export const Game = () => {
  const [maze, setMaze] = useState<Maze>();
  const [isGameRunning, setIsGameRunning] = useState<boolean>(true);
  const [width, setWidth] = useState<number>(30);
  const [height, setHeight] = useState<number>(30);
  const [playerPosition, setPlayerPosition] = useState<CellCoordinates>({x: 0, y: 0});
  const [keys, setKeys] = useState<Array<ArrowKey>>([]);

  const keyDownHandler = ({key}: { key: string }) => {
    if (maze && isGameRunning) {
      if (arrowKeys.includes(key)) {
        handlePlayerPositionChange(key);
      }
    }
  };

  const handlePlayerPositionChange = (key: string): void => {
    if (maze) {
      const newPlayerPosition = {...playerPosition};
      switch (key) {
        case arrowKeys[0]: {
          if (!maze[playerPosition.y][playerPosition.x].bottomWall) {
            newPlayerPosition.y += 1;
          }
          break;
        }
        case arrowKeys[1]: {
          if (!maze[playerPosition.y][playerPosition.x].topWall) {
            newPlayerPosition.y -= 1;
          }
          break;
        }
        case arrowKeys[2]: {
          if (!maze[playerPosition.y][playerPosition.x].leftWall) {
            newPlayerPosition.x -= 1;
          }
          break;
        }
        case arrowKeys[3]: {
          if (!maze[playerPosition.y][playerPosition.x].rightWall) {
            newPlayerPosition.x += 1;
          }
          break;
        }
      }
      let newKey: ArrowKey;
      if (playerPosition.x === newPlayerPosition.x && playerPosition.y === newPlayerPosition.y) {
        newKey = {keySymbol: ARROW_SYMBOLS[key], isValid: false};
      } else {
        newKey = {keySymbol: ARROW_SYMBOLS[key], isValid: true};
        setPlayerPosition(newPlayerPosition);
      }
      const newKeysArray = [...keys];
      newKeysArray.unshift(newKey);
      setKeys(newKeysArray);
      console.log(keys);
    }
  };


  useEventListener('keydown', keyDownHandler);

  useEffect(() => {
    setMaze(generateMaze(width, height, getRandomCell(width, height)));
  }, [width, height]);

  return (
    <div className="Game">
      {maze && <Board maze={maze} player={playerPosition}/>}
      <Keys keys={keys.slice(0, 5)}/>
    </div>
  );
};
